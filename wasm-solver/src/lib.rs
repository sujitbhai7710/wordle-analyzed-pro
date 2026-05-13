use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};

/// Wordle clue feedback for a single letter
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum CellColor {
    Correct,
    Present,
    Absent,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Clue {
    pub letter: char,
    pub color: CellColor,
}

/// Result from running a single solver method
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SolverResult {
    pub method_name: String,
    pub method_description: String,
    pub guesses: Vec<String>,
    pub total_guesses: u32,
    pub solved: bool,
    pub clue_history: Vec<Vec<Clue>>,
}

/// Difficulty metrics for a word
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct DifficultyResult {
    pub overall: u32,
    pub letter_frequency: u32,
    pub positional_ambiguity: u32,
    pub duplicate_risk: u32,
    pub common_pattern: u32,
    pub info_entropy: u32,
    pub label: String,
    pub description: String,
}

/// Skill breakdown
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SkillResult {
    pub skill_score: u32,
    pub luck_score: u32,
    pub efficiency: u32,
    pub consistency: u32,
    pub clue_utilization: u32,
    pub skill_label: String,
}

/// Per-turn analysis
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct TurnResult {
    pub guess: String,
    pub clue: Vec<Clue>,
    pub remaining_before: u32,
    pub remaining_after: u32,
    pub guess_quality: f64,
    pub avg_remaining: f64,
    pub turn_skill: u32,
    pub turn_luck: u32,
}

/// Generate Wordle-style feedback for a guess against an answer
fn generate_clue(guess: &str, answer: &str) -> Vec<Clue> {
    let guess_chars: Vec<char> = guess.chars().collect();
    let answer_chars: Vec<char> = answer.chars().collect();
    let mut result: Vec<Option<Clue>> = vec![None; 5];
    let mut answer_used = [false; 5];
    let mut guess_used = [false; 5];

    // First pass: greens
    for i in 0..5 {
        if guess_chars[i] == answer_chars[i] {
            result[i] = Some(Clue {
                letter: guess_chars[i],
                color: CellColor::Correct,
            });
            answer_used[i] = true;
            guess_used[i] = true;
        }
    }

    // Second pass: yellows
    for i in 0..5 {
        if guess_used[i] {
            continue;
        }
        for j in 0..5 {
            if answer_used[j] {
                continue;
            }
            if guess_chars[i] == answer_chars[j] {
                result[i] = Some(Clue {
                    letter: guess_chars[i],
                    color: CellColor::Present,
                });
                answer_used[j] = true;
                break;
            }
        }
        if result[i].is_none() {
            result[i] = Some(Clue {
                letter: guess_chars[i],
                color: CellColor::Absent,
            });
        }
    }

    result.into_iter().map(|c| c.unwrap()).collect()
}

/// Filter words matching clue pattern
fn get_remaining_words(guess: &str, clue: &[Clue], word_list: &[String]) -> Vec<String> {
    word_list
        .iter()
        .filter(|word| {
            let word_upper: Vec<char> = word.to_uppercase().chars().collect();
            if word_upper.len() != 5 {
                return false;
            }

            for i in 0..5 {
                let clue_letter = clue[i].letter.to_uppercase().next().unwrap();
                match &clue[i].color {
                    CellColor::Correct => {
                        if word_upper[i] != clue_letter {
                            return false;
                        }
                    }
                    CellColor::Present => {
                        if word_upper[i] == clue_letter {
                            return false;
                        }
                        if !word_upper.contains(&clue_letter) {
                            return false;
                        }
                    }
                    CellColor::Absent => {
                        let is_elsewhere_correct = clue.iter().enumerate().any(|(j, c)| {
                            j != i
                                && c.letter.to_uppercase().next().unwrap() == clue_letter
                                && matches!(c.color, CellColor::Correct)
                        });
                        let is_elsewhere_present = clue.iter().enumerate().any(|(j, c)| {
                            j != i
                                && c.letter.to_uppercase().next().unwrap() == clue_letter
                                && matches!(c.color, CellColor::Present)
                        });

                        if is_elsewhere_correct || is_elsewhere_present {
                            if word_upper[i] == clue_letter {
                                return false;
                            }
                        } else if word_upper.contains(&clue_letter) {
                            return false;
                        }
                    }
                }
            }
            true
        })
        .cloned()
        .collect()
}

/// Calculate average remaining words for a guess
fn get_average_remaining(guess: &str, remaining: &[String]) -> f64 {
    if remaining.is_empty() {
        return 0.0;
    }

    let sample_size = remaining.len().min(80);
    let step = (remaining.len() / sample_size).max(1);
    let mut total_remaining = 0.0;
    let mut count = 0;

    let mut i = 0;
    while i < remaining.len() {
        let test_answer = &remaining[i];
        let test_clue = generate_clue(guess, test_answer);
        let test_remaining = get_remaining_words(guess, &test_clue, remaining);
        total_remaining += test_remaining.len() as f64;
        count += 1;
        i += step;
    }

    if count > 0 {
        total_remaining / count as f64
    } else {
        0.0
    }
}

/// Calculate guess quality (0-100)
fn calc_guess_quality(actual_remaining: usize, total_before: usize) -> f64 {
    if total_before <= 1 {
        return 100.0;
    }
    let eliminated = total_before - actual_remaining;
    ((eliminated as f64 / (total_before - 1) as f64) * 100.0).min(100.0).max(0.0)
}

/// Find best play using entropy maximization
fn get_best_play_entropy(remaining: &[String]) -> String {
    if remaining.is_empty() {
        return String::new();
    }
    if remaining.len() == 1 {
        return remaining[0].clone();
    }

    let top_starters = [
        "SOARE", "SLATE", "CRANE", "SALET", "TRACE", "RAISE", "STARE", "CRATE", "IRATE", "ARISE",
    ];

    let mut candidates: Vec<String> = remaining.to_vec();
    for starter in &top_starters {
        if !candidates.iter().any(|c| c == starter) {
            candidates.push(starter.to_string());
        }
    }
    candidates.truncate(40);

    let mut best_word = remaining[0].clone();
    let mut best_score = f64::NEG_INFINITY;

    for candidate in &candidates {
        let mut clue_groups: HashMap<String, u32> = HashMap::new();
        let sample_size = remaining.len().min(80);
        let step = (remaining.len() / sample_size).max(1);

        let mut j = 0;
        while j < remaining.len() {
            let test_answer = &remaining[j];
            let test_clue = generate_clue(candidate, test_answer);
            let key: String = test_clue
                .iter()
                .map(|c| format!("{}{:?}", c.letter, c.color))
                .collect();
            *clue_groups.entry(key).or_insert(0) += 1;
            j += step;
        }

        let total: f64 = clue_groups.values().map(|&v| v as f64).sum::<f64>();
        let mut score = 0.0;
        for &count in clue_groups.values() {
            let p = count as f64 / total;
            if p > 0.0 {
                score -= p * p.log2();
            }
        }

        // Small bonus for being a possible answer
        if remaining.iter().any(|w| w.eq_ignore_ascii_case(candidate)) {
            score += 0.05;
        }

        if score > best_score {
            best_score = score;
            best_word = candidate.clone();
        }
    }

    best_word
}

/// Find best play using letter frequency
fn get_best_play_frequency(remaining: &[String]) -> String {
    if remaining.is_empty() {
        return String::new();
    }

    let mut letter_freqs: HashMap<char, u32> = HashMap::new();
    for word in remaining {
        for letter in word.to_uppercase().chars().collect::<HashSet<_>>() {
            *letter_freqs.entry(letter).or_insert(0) += 1;
        }
    }

    let mut best_word = remaining[0].clone();
    let mut best_score = -1i32;

    for word in remaining.iter().take(60) {
        let score: i32 = word
            .to_uppercase()
            .chars()
            .collect::<HashSet<_>>()
            .iter()
            .map(|l| *letter_freqs.get(l).unwrap_or(&0) as i32)
            .sum();
        if score > best_score {
            best_score = score;
            best_word = word.clone();
        }
    }

    best_word
}

/// Find best play using minimax
fn get_best_play_minimax(remaining: &[String]) -> String {
    if remaining.is_empty() {
        return String::new();
    }

    let candidates: Vec<&String> = remaining.iter().take(30).collect();
    let mut best_word = remaining[0].clone();
    let mut best_worst_case = usize::MAX;

    for candidate in &candidates {
        let mut worst_case = 0usize;
        let sample_size = remaining.len().min(40);
        let step = (remaining.len() / sample_size).max(1);

        let mut j = 0;
        while j < remaining.len() {
            let test_clue = generate_clue(candidate, &remaining[j]);
            let test_remaining = get_remaining_words(candidate, &test_clue, remaining);
            worst_case = worst_case.max(test_remaining.len());
            j += step;
        }

        if worst_case < best_worst_case {
            best_worst_case = worst_case;
            best_word = (*candidate).clone();
        }
    }

    best_word
}

/// Find best play: first alphabetically
fn get_best_play_first_possible(remaining: &[String]) -> String {
    let mut sorted: Vec<&String> = remaining.iter().collect();
    sorted.sort();
    sorted.first().map(|s| (*s).clone()).unwrap_or_default()
}

/// Find best play: random (seeded)
fn get_best_play_random(remaining: &[String], seed: &mut u32) -> String {
    if remaining.is_empty() {
        return String::new();
    }
    // Simple LCG
    *seed = seed.wrapping_mul(1103515245).wrapping_add(12345) & 0x7fffffff;
    let idx = (*seed as usize) % remaining.len();
    remaining[idx].clone()
}

/// Simulate a full AI playthrough with a given strategy
fn simulate_playthrough(
    answer: &str,
    word_list: &[String],
    strategy: &str,
    seed: &mut u32,
) -> SolverResult {
    let answer_upper: String = answer.to_uppercase();
    let mut current = word_list.to_vec();
    let mut guesses: Vec<String> = Vec::new();
    let mut clue_history: Vec<Vec<Clue>> = Vec::new();

    for _ in 0..6 {
        if current.is_empty() {
            break;
        }

        let ai_guess = match strategy {
            "entropy" => get_best_play_entropy(&current),
            "frequency" => get_best_play_frequency(&current),
            "minimax" => get_best_play_minimax(&current),
            "first_possible" => get_best_play_first_possible(&current),
            "random" => get_best_play_random(&current, seed),
            _ => get_best_play_entropy(&current),
        };

        if ai_guess.is_empty() {
            break;
        }

        let clue = generate_clue(&ai_guess, &answer_upper);
        let new_remaining = get_remaining_words(&ai_guess, &clue, &current);

        guesses.push(ai_guess.clone());
        clue_history.push(clue.clone());

        current = new_remaining;

        if ai_guess.to_uppercase() == answer_upper {
            break;
        }
        if current.len() <= 1 {
            break;
        }
    }

    let solved = guesses
        .last()
        .map(|g| g.to_uppercase() == answer_upper)
        .unwrap_or(false);
    let total_guesses = guesses.len() as u32;

    let (method_name, method_description) = match strategy {
        "entropy" => (
            "Entropy Maximizer".to_string(),
            "Maximizes expected information gain each turn. The gold standard algorithm.".to_string(),
        ),
        "frequency" => (
            "Letter Frequency".to_string(),
            "Prioritizes testing the most common letters first. Simple but effective.".to_string(),
        ),
        "minimax" => (
            "Minimax".to_string(),
            "Minimizes the worst-case scenario. Plays it safe by ensuring no outcome is too bad.".to_string(),
        ),
        "first_possible" => (
            "First Possible".to_string(),
            "Always guesses the first alphabetically from remaining possible answers. Naive but deterministic.".to_string(),
        ),
        "random" => (
            "Random Baseline".to_string(),
            "Picks a random word from remaining possibilities. Shows the floor of performance.".to_string(),
        ),
        _ => ("Unknown".to_string(), String::new()),
    };

    SolverResult {
        method_name,
        method_description,
        guesses,
        total_guesses,
        solved,
        clue_history,
    }
}

/// Calculate difficulty metrics for a word
fn calculate_difficulty(answer: &str, word_list: &[String]) -> DifficultyResult {
    let answer_upper: String = answer.to_uppercase();
    let answer_chars: Vec<char> = answer_upper.chars().collect();
    let total_words = word_list.len();

    // Letter frequency score
    let mut letter_freqs: HashMap<char, u32> = HashMap::new();
    for word in word_list {
        for letter in word.to_uppercase().chars() {
            *letter_freqs.entry(letter).or_insert(0) += 1;
        }
    }
    let avg_letter_freq: f64 = answer_chars
        .iter()
        .map(|l| (*letter_freqs.get(l).unwrap_or(&0) as f64) / total_words as f64)
        .sum::<f64>()
        / 5.0;
    let letter_frequency = ((1.0 - avg_letter_freq) * 100.0).round() as u32;

    // Positional ambiguity
    let mut positional_matches = 0u32;
    for i in 0..5 {
        let letter_at_pos = answer_chars[i];
        positional_matches += word_list
            .iter()
            .filter(|w| {
                w.to_uppercase().chars().nth(i) == Some(letter_at_pos)
            })
            .count() as u32;
    }
    let avg_pos_matches = positional_matches as f64 / 5.0;
    let positional_ambiguity =
        ((avg_pos_matches / total_words as f64) * 300.0).min(100.0).round() as u32;

    // Duplicate risk
    let unique_letters: HashSet<char> = answer_chars.iter().cloned().collect();
    let duplicate_risk = if unique_letters.len() < 5 { 70 } else { 15 };

    // Common pattern
    let common_patterns = ["IGHT", "OUND", "OUGH", "ATION", "EACH", "ATCH", "OCK"];
    let has_common_pattern = common_patterns.iter().any(|p| answer_upper.contains(p));
    let common_pattern = if has_common_pattern { 75 } else { 25 };

    // Information entropy
    let top_starters = ["SLATE", "CRANE", "TRACE", "SALET", "RAISE"];
    let mut total_entropy = 0.0;
    for starter in &top_starters {
        let clue = generate_clue(starter, &answer_upper);
        let remaining = get_remaining_words(starter, &clue, word_list);
        let p = remaining.len() as f64 / total_words as f64;
        if p > 0.0 && p < 1.0 {
            total_entropy += -p * p.log2();
        }
    }
    let avg_entropy = total_entropy / top_starters.len() as f64;
    let info_entropy = (avg_entropy * 25.0).min(100.0).round() as u32;

    // Overall
    let overall = ((letter_frequency as f64 * 0.2
        + positional_ambiguity as f64 * 0.25
        + duplicate_risk as f64 * 0.15
        + common_pattern as f64 * 0.15
        + info_entropy as f64 * 0.25)
        .round()) as u32;

    let (label, description) = if overall <= 20 {
        ("Easy".to_string(), "Common letters in typical positions. Most strong openers will crack this quickly.".to_string())
    } else if overall <= 40 {
        ("Moderate".to_string(), "A fair challenge. Good strategy and a bit of luck will solve this in 3-4 guesses.".to_string())
    } else if overall <= 60 {
        ("Hard".to_string(), "Tricky letter combinations or uncommon patterns. Requires careful elimination strategy.".to_string())
    } else if overall <= 80 {
        ("Very Hard".to_string(), "Unusual letter patterns or duplicate letters make this word particularly challenging to deduce.".to_string())
    } else {
        ("Extreme".to_string(), "Rare letters, uncommon patterns, or high ambiguity. Even optimal play may need 5-6 guesses.".to_string())
    };

    DifficultyResult {
        overall,
        letter_frequency,
        positional_ambiguity,
        duplicate_risk,
        common_pattern,
        info_entropy,
        label,
        description,
    }
}

// ============ WASM EXPORTED FUNCTIONS ============

#[wasm_bindgen]
pub fn run_all_solvers(answer: &str, word_list_json: &str) -> JsValue {
    let word_list: Vec<String> = serde_json::from_str(word_list_json).unwrap_or_default();
    let answer_upper = answer.to_uppercase();

    let mut seed: u32 = 0;
    for c in answer_upper.chars() {
        seed += c as u32;
    }

    let strategies = ["entropy", "frequency", "random", "first_possible", "minimax"];
    let results: Vec<SolverResult> = strategies
        .iter()
        .map(|strategy| simulate_playthrough(&answer_upper, &word_list, strategy, &mut seed))
        .collect();

    serde_wasm_bindgen::to_value(&results).unwrap_or(JsValue::NULL)
}

#[wasm_bindgen]
pub fn compute_difficulty(answer: &str, word_list_json: &str) -> JsValue {
    let word_list: Vec<String> = serde_json::from_str(word_list_json).unwrap_or_default();
    let result = calculate_difficulty(answer, &word_list);
    serde_wasm_bindgen::to_value(&result).unwrap_or(JsValue::NULL)
}

#[wasm_bindgen]
pub fn compute_skill(
    player_guesses_json: &str,
    answer: &str,
    word_list_json: &str,
    hard_mode: bool,
) -> JsValue {
    let player_guesses: Vec<String> =
        serde_json::from_str(player_guesses_json).unwrap_or_default();
    let word_list: Vec<String> = serde_json::from_str(word_list_json).unwrap_or_default();
    let answer_upper = answer.to_uppercase();

    // Simulate AI playthrough to compare
    let mut seed: u32 = 0;
    for c in answer_upper.chars() {
        seed += c as u32;
    }
    let ai_result = simulate_playthrough(&answer_upper, &word_list, "entropy", &mut seed);

    // Analyze each player turn
    let mut current = word_list.clone();
    let mut turn_results: Vec<TurnResult> = Vec::new();
    let mut previous_clues: Vec<Vec<Clue>> = Vec::new();

    for guess in &player_guesses {
        let guess_upper = guess.to_uppercase();
        if guess_upper == answer_upper {
            break;
        }

        let remaining_before = current.len();
        let clue = generate_clue(&guess_upper, &answer_upper);
        let new_remaining = get_remaining_words(&guess_upper, &clue, &current);
        let remaining_after = new_remaining.len();

        let guess_quality = calc_guess_quality(remaining_after, remaining_before);
        let avg_remaining = get_average_remaining(&guess_upper, &current);

        // Calculate turn skill/luck
        let luck_ratio = if avg_remaining > 0.0 {
            remaining_after as f64 / avg_remaining
        } else {
            1.0
        };
        let turn_luck = if luck_ratio < 0.5 {
            75
        } else if luck_ratio > 1.5 {
            25
        } else {
            50
        };
        let ai_gq = if ai_result.guesses.len() > turn_results.len() {
            // Compare with AI's equivalent turn
            calc_guess_quality(1, remaining_before.max(2)) // Approximate
        } else {
            50.0
        };
        let quality_ratio = if ai_gq > 0.0 {
            guess_quality / ai_gq
        } else {
            1.0
        };
        let turn_skill = ((quality_ratio * 60.0 + 20.0).min(100.0).max(0.0)) as u32;

        turn_results.push(TurnResult {
            guess: guess_upper.clone(),
            clue: clue.clone(),
            remaining_before: remaining_before as u32,
            remaining_after: remaining_after as u32,
            guess_quality,
            avg_remaining,
            turn_skill,
            turn_luck,
        });

        previous_clues.push(clue);
        current = new_remaining;
    }

    // Calculate overall skill breakdown
    let player_avg_quality = if turn_results.is_empty() {
        50.0
    } else {
        turn_results.iter().map(|t| t.guess_quality).sum::<f64>() / turn_results.len() as f64
    };

    let ai_guesses = ai_result.total_guesses;
    let player_guesses_count = player_guesses.len() as u32;
    let efficiency_raw = if ai_guesses > 0 {
        (ai_guesses as f64 / player_guesses_count as f64).min(1.0)
    } else {
        0.5
    };

    let qualities: Vec<f64> = turn_results.iter().map(|t| t.guess_quality).collect();
    let avg_quality = qualities.iter().sum::<f64>() / qualities.len().max(1) as f64;
    let variance = qualities
        .iter()
        .map(|q| (q - avg_quality).powi(2))
        .sum::<f64>()
        / qualities.len().max(1) as f64;
    let consistency_raw = (1.0 - variance.sqrt() / 50.0).max(0.0);

    let skill_score = (player_avg_quality * 0.3
        + efficiency_raw * 25.0
        + consistency_raw * 20.0
        + 50.0 * 0.25) // clue utilization approximation
        .round() as u32;

    let luck_score = if turn_results.is_empty() {
        50
    } else {
        (turn_results.iter().map(|t| t.turn_luck as f64).sum::<f64>()
            / turn_results.len() as f64)
            .round() as u32
    };

    let efficiency = (efficiency_raw * 100.0).round() as u32;
    let consistency = (consistency_raw * 100.0).round() as u32;
    let clue_utilization = 75u32; // approximation

    let skill_label = if skill_score >= 90 {
        "Exceptional"
    } else if skill_score >= 75 {
        "Skilled"
    } else if skill_score >= 60 {
        "Above Average"
    } else if skill_score >= 45 {
        "Average"
    } else if skill_score >= 30 {
        "Below Average"
    } else {
        "Needs Work"
    }
    .to_string();

    let result = SkillResult {
        skill_score,
        luck_score,
        efficiency,
        consistency,
        clue_utilization,
        skill_label,
    };

    serde_wasm_bindgen::to_value(&result).unwrap_or(JsValue::NULL)
}

/// Quick entropy-based best play suggestion
#[wasm_bindgen]
pub fn suggest_best_play(remaining_words_json: &str) -> String {
    let remaining: Vec<String> = serde_json::from_str(remaining_words_json).unwrap_or_default();
    get_best_play_entropy(&remaining)
}
