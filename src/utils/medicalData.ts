
interface Disease {
  name: string;
  symptoms: string[];
  medicines: string[];
  foods: string[];
  restPeriod: string;
  motivation: string;
}

export const medicalData: Disease[] = [
  {
    name: "Common Cold",
    symptoms: ["runny nose", "congestion", "sore throat", "cough", "sneezing", "mild fever"],
    medicines: ["Acetaminophen", "Ibuprofen", "Decongestants", "Cough suppressants"],
    foods: ["Chicken soup", "Honey with warm water", "Citrus fruits", "Ginger tea"],
    restPeriod: "3-7 days with adequate rest",
    motivation: "Remember that your body needs time to heal. Rest is a vital part of recovery!"
  },
  {
    name: "Influenza (Flu)",
    symptoms: ["high fever", "body aches", "fatigue", "headache", "chills", "dry cough"],
    medicines: ["Oseltamivir (Tamiflu)", "Acetaminophen", "Ibuprofen", "Decongestants"],
    foods: ["Clear broths", "Electrolyte drinks", "Fresh fruits", "Bland foods"],
    restPeriod: "7-14 days with bed rest for the first few days",
    motivation: "Flu requires proper rest. Your body is fighting hard - support it by taking adequate time to recover."
  },
  {
    name: "Migraine",
    symptoms: ["intense headache", "throbbing pain", "nausea", "sensitivity to light", "sensitivity to sound", "visual disturbances"],
    medicines: ["Triptans", "NSAIDs", "Anti-nausea medications", "Beta-blockers"],
    foods: ["Magnesium-rich foods", "Riboflavin-rich foods", "Hydrating drinks", "Avoid trigger foods"],
    restPeriod: "Rest in a dark, quiet room until symptoms subside",
    motivation: "Migraines can be debilitating, but with proper management and rest in a calm environment, relief will come."
  },
  {
    name: "Gastroenteritis",
    symptoms: ["diarrhea", "vomiting", "stomach pain", "stomach cramps", "fever", "nausea"],
    medicines: ["Oral rehydration solutions", "Loperamide", "Bismuth subsalicylate", "Probiotics"],
    foods: ["Clear broths", "BRAT diet (Bananas, Rice, Applesauce, Toast)", "Clear fluids", "Avoid dairy"],
    restPeriod: "2-5 days with light activity and focus on hydration",
    motivation: "Your digestive system needs time to recover. Stay hydrated and ease back into normal activities gradually."
  },
  {
    name: "Bronchitis",
    symptoms: ["persistent cough", "mucus production", "shortness of breath", "chest discomfort", "mild fever", "fatigue"],
    medicines: ["Cough suppressants", "Expectorants", "Bronchodilators", "NSAIDs for fever"],
    foods: ["Warm liquids", "Honey", "Garlic", "Foods rich in vitamin C"],
    restPeriod: "7-10 days with decreased activity and adequate rest",
    motivation: "Your airways need time to heal. Proper rest will help reduce coughing episodes and speed recovery."
  },
  {
    name: "Hypertension",
    symptoms: ["headache", "shortness of breath", "dizziness", "chest pain", "visual changes", "blood in urine"],
    medicines: ["ACE inhibitors", "Angiotensin II receptor blockers", "Calcium channel blockers", "Diuretics"],
    foods: ["DASH diet", "Low-sodium foods", "Potassium-rich foods", "Whole grains"],
    restPeriod: "Regular moderate exercise with adequate rest between sessions",
    motivation: "Managing hypertension is a long-term commitment. Small lifestyle changes can lead to significant health improvements."
  },
  {
    name: "Allergic Rhinitis",
    symptoms: ["sneezing", "runny nose", "congestion", "itchy eyes", "watery eyes", "itchy throat"],
    medicines: ["Antihistamines", "Nasal corticosteroids", "Decongestants", "Mast cell stabilizers"],
    foods: ["Anti-inflammatory foods", "Local honey", "Spicy foods", "Avoid known allergens"],
    restPeriod: "Minimize exposure to allergens and rest as needed",
    motivation: "Identifying and avoiding your triggers, along with proper medication, can significantly improve your quality of life."
  },
  {
    name: "Urinary Tract Infection",
    symptoms: ["frequent urination", "burning sensation", "cloudy urine", "strong-smelling urine", "pelvic pain", "lower abdominal pain"],
    medicines: ["Antibiotics", "Pain relievers", "Urinary analgesics", "Phenazopyridine"],
    foods: ["Cranberry juice", "Water", "Vitamin C rich foods", "Probiotic foods"],
    restPeriod: "3-7 days with increased fluid intake and bathroom breaks",
    motivation: "With proper hydration and complete antibiotic treatment, you'll feel better soon. Don't rush recovery."
  }
];

export function findMatchingDiseases(symptoms: string[]): Disease[] {
  // Convert all symptoms to lowercase for case-insensitive matching
  const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim());
  
  return medicalData.filter(disease => {
    // Check if any symptoms match
    return disease.symptoms.some(symptom => 
      normalizedSymptoms.some(userSymptom => 
        symptom.includes(userSymptom) || userSymptom.includes(symptom)
      )
    );
  });
}

export function generateResponse(input: string): string {
  // Check if the input is not medical related
  const nonMedicalKeywords = ['weather', 'sports', 'politics', 'news', 'movie', 'music', 'game', 'food recipe', 'travel'];
  if (nonMedicalKeywords.some(keyword => input.toLowerCase().includes(keyword))) {
    return "I'm sorry, I'm a medical assistant and can only provide information about medical symptoms, diseases, and treatments. Please ask me about your health concerns.";
  }

  // Extract potential symptoms from the input
  const words = input.toLowerCase().split(/\s+/);
  const potentialSymptoms = words.filter(word => word.length > 3); // Filter out short words
  
  // Find matching diseases
  const matchingDiseases = findMatchingDiseases(potentialSymptoms);
  
  if (matchingDiseases.length === 0) {
    return "I'm sorry, I couldn't identify specific conditions based on the information provided. Could you please provide more details about your symptoms? For example, describe the location, duration, and severity of your symptoms.";
  }
  
  // Generate response for matching diseases
  let response = "Based on the symptoms you've described, you might be experiencing:\n\n";
  
  matchingDiseases.forEach((disease, index) => {
    response += `**${disease.name}**\n`;
    response += `**Recommended medicines:** ${disease.medicines.join(", ")}\n`;
    response += `**Dietary suggestions:** ${disease.foods.join(", ")}\n`;
    response += `**Rest needed:** ${disease.restPeriod}\n`;
    response += `**A word of encouragement:** ${disease.motivation}\n`;
    
    if (index < matchingDiseases.length - 1) {
      response += "\n";
    }
  });
  
  response += "\n**Important:** This is not a substitute for professional medical advice. Please consult with a healthcare professional for proper diagnosis and treatment.";
  
  return response;
}
