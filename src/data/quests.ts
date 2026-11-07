// Quest data. Item names match the RealmEye wiki so images line up (public/img/<slug>.png).
// Generated from the original data.js; edit freely.

export type QuestCategory = "Scout" | "Beginner" | "Standard" | "Mighty" | "Epic" | "Craft" | "Temporary Craft";

export interface Quest {
  name: string;
  category: QuestCategory;
  /** item name -> count needed */
  needs: Record<string, number>;
  rewards: string[];
}

type Row = [name: string, needs: Record<string, number>, rewards: string[]];

const QUEST_DATA: Record<QuestCategory, Row[]> = {
  "Scout": [
    ["Scout the Pit", {"Mark of Stheno": 1}, ["Potion of Speed", "Potion of Speed"]],
    ["Scout the Sewers", {"Mark of Gulpord": 1}, ["Potion of Defense", "Potion of Defense"]],
    ["Scout the Abyss", {"Mark of Malphas": 1}, ["Potion of Vitality", "Potion of Vitality"]],
    ["Scout the Sprites", {"Mark of Limon": 1}, ["Potion of Dexterity", "Potion of Dexterity"]],
    ["Scout the Lair", {"Mark of Septavius": 1}, ["Potion of Wisdom", "Potion of Wisdom"]],
    ["Scout the Theatre", {"Mark of the Puppet Master": 1}, ["Potion of Attack", "Potion of Attack"]],
    ["Scout the Woods", {"Mark of the Fountain Spirit": 1}, ["Potion of Speed", "Potion of Dexterity"]],
    ["Scout the Library", {"Mark of the Archivist": 1}, ["Potion of Vitality", "Potion of Wisdom"]],
  ],
  "Beginner": [
    ["The Pirate King", {"Mark of Dreadstump": 4}, ["Beginner Quest Chest"]],
    ["The Mama", {"Mark of Mama Megamoth": 4}, ["Beginner Quest Chest"]],
    ["The Spider Queen", {"Mark of Arachna": 4}, ["Beginner Quest Chest"]],
    ["The Masked God", {"Mark of Mixcoatl": 4}, ["Beginner Quest Chest"]],
    ["The Queen Bee", {"Mark of the Queen Bee": 4}, ["Beginner Quest Chest"]],
    ["Run the Table", {"Mark of Dreadstump": 1, "Mark of Mama Megamoth": 1, "Mark of Arachna": 1, "Mark of Mixcoatl": 1, "Mark of the Queen Bee": 1}, ["Beginner Quest Chest", "Treasure Map"]],
  ],
  "Standard": [
    ["The Snake Queen", {"Mark of Stheno": 8}, ["Quest Chest"]],
    ["The Sprite Goddess", {"Mark of Limon": 8}, ["Quest Chest"]],
    ["The Titan", {"Mark of the Sandstone Titan": 3}, ["Quest Chest"]],
    ["The Ghost God", {"Mark of Septavius": 8}, ["Quest Chest"]],
    ["The Archdemon", {"Mark of Malphas": 8}, ["Quest Chest"]],
    ["The Slime God", {"Mark of Gulpord": 6}, ["Quest Chest"]],
    ["The Puppet Master", {"Mark of the Puppet Master": 6}, ["Quest Chest"]],
    ["The Fountain Spirit", {"Mark of the Fountain Spirit": 5}, ["Quest Chest"]],
    ["The Archivist", {"Mark of the Archivist": 5}, ["Quest Chest"]],
    ["The Apparition", {"Mark of Skuld": 3}, ["Quest Chest"]],
    ["The Vampire Lord", {"Mark of Ruthven": 4}, ["Quest Chest"]],
    ["The Mad Scientist", {"Mark of Dr Terrible": 4}, ["Quest Chest"]],
    ["To the Mountains!", {"Mark of Septavius": 1, "Mark of Limon": 1, "Mark of Gulpord": 1, "Mark of Malphas": 1, "Mark of Dr Terrible": 1, "Mark of the Puppet Master": 1, "Mark of Skuld": 1}, ["Quest Chest"]],
    ["Smite the Undead!", {"Mark of Septavius": 2, "Mark of Skuld": 2, "Mark of Ruthven": 2}, ["Quest Chest"]],
    ["As Above, So Below", {"Mark of Limon": 3, "Mark of Gulpord": 3}, ["Quest Chest"]],
    ["Blessings and Curses", {"Mark of the Fountain Spirit": 3, "Mark of the Archivist": 3}, ["Quest Chest"]],
    ["Demonhunter", {"Mark of Malphas": 3, "Mark of Daichi": 2}, ["Quest Chest"]],
    ["That's the Spirit", {"Mark of Limon": 1, "Mark of Septavius": 1, "Mark of the Fountain Spirit": 1, "Mark of Skuld": 1}, ["Quest Chest"]],
    ["Rainbow Road", {"Mark of Septavius": 1, "Mark of Limon": 1, "Mark of Gulpord": 1, "Mark of Malphas": 1}, ["Quest Chest"]],
    ["The Cost of Wisdom", {"Mark of Dr Terrible": 2, "Mark of the Archivist": 2}, ["Quest Chest"]],
  ],
  "Mighty": [
    ["The Effigy", {"Mark of the Effigy": 1}, ["Mighty Quest Chest"]],
    ["The New King", {"Mark of Bilgewater": 4}, ["Mighty Quest Chest"]],
    ["The Megamoth", {"Mark of the Megamoth": 4}, ["Mighty Quest Chest"]],
    ["The Prodigal Son", {"Mark of the Son of Arachna": 4}, ["Mighty Quest Chest"]],
    ["The Mermaid Goddess", {"Mark of Thessal": 4}, ["Mighty Quest Chest"]],
    ["The Nightmare", {"Mark of Parasitic Horrors": 4}, ["Mighty Quest Chest"]],
    ["The Ghost Pirate", {"Mark of Davy Jones": 4}, ["Mighty Quest Chest"]],
    ["The Elemental Wyvern", {"Mark of the Wyvern": 4}, ["Mighty Quest Chest"]],
    ["The Fallen", {"Mark of Daichi": 4}, ["Mighty Quest Chest"]],
    ["The Unwilling", {"Mark of Esben": 4}, ["Mighty Quest Chest"]],
    ["The Ancients", {"Mark of Geb": 4}, ["Mighty Quest Chest"]],
    ["The Mad God", {"Mark of Oryx": 4}, ["Mighty Quest Chest"]],
    ["The Tesseract Goddess", {"Mark of the Tesseract Goddess": 4}, ["Mighty Quest Chest"]],
    ["The Cursed Hearth", {"Mark of the Wetlands": 4}, ["Mighty Quest Chest"]],
    ["The Doorwarden", {"Mark of Janus": 4}, ["Mighty Quest Chest"]],
    ["Double Trouble", {"Mark of Oryx": 3, "Mark of Janus": 3}, ["Mighty Quest Chest"]],
    ["Epic Showdown", {"Mark of Bilgewater": 2, "Mark of the Son of Arachna": 2, "Mark of the Megamoth": 2}, ["Mighty Quest Chest"]],
    ["Exterminate!", {"Mark of the Son of Arachna": 2, "Mark of the Megamoth": 2, "Mark of the Killer Bee Queen": 1}, ["Mighty Quest Chest"]],
    ["Unsettling Foes", {"Mark of Parasitic Horrors": 2, "Mark of Esben": 1, "Mark of Davy Jones": 1}, ["Mighty Quest Chest"]],
    ["Long Forgotten", {"Mark of Esben": 2, "Mark of Geb": 2}, ["Mighty Quest Chest"]],
    ["Thar be Pirates!", {"Mark of Bilgewater": 2, "Mark of Davy Jones": 2}, ["Mighty Quest Chest"]],
    ["Lost and Found", {"Mark of Parasitic Horrors": 1, "Mark of the Wyvern": 1, "Mark of Davy Jones": 1, "Mark of Geb": 1}, ["Mighty Quest Chest"]],
    ["Ocean Man", {"Mark of Thessal": 2, "Mark of Davy Jones": 1, "Mark of Bilgewater": 1}, ["Mighty Quest Chest"]],
  ],
  "Epic": [
    ["The Killer Queen", {"Mark of the Killer Bee Queen": 3}, ["Honeyed Epic Quest Chest", "Lucky Clover"]],
    ["The King", {"Mark of the Forgotten King": 3}, ["Royal Epic Quest Chest", "Lucky Clover"]],
    ["The Colossus", {"Mark of the Marble Colossus": 3}, ["Marble Epic Quest Chest", "Lucky Clover"]],
    ["The Cultist", {"Mark of Malus": 3}, ["Cultish Epic Quest Chest", "Lucky Clover"]],
    ["The End", {"Mark of the Void Entity": 3}, ["Voided Epic Quest Chest", "Lucky Clover"]],
    ["The Crystal", {"Mark of the Crystal Entity": 3}, ["Crystallized Epic Quest Chest", "Lucky Clover"]],
    ["Havoc in the Halls", {"Mark of the Marble Colossus": 2, "Mark of Malus": 2}, ["Voided Epic Quest Chest", "Lucky Clover"]],
  ],
  "Craft": [
    ["Eggs for Breakfast", {"Common Humanoid Egg": 1, "Common Avian Egg": 1, "Common Farm Egg": 1}, ["Egg Omelette"]],
    ["Eggs for Lunch", {"Common Feline Egg": 1, "Common Canine Egg": 1, "Common Aquatic Egg": 1}, ["Egg Omelette"]],
    ["Eggs for Dinner", {"Common Exotic Egg": 1, "Common Reptile Egg": 1, "Common Automaton Egg": 1}, ["Egg Omelette"]],
    ["Clean Laundry", {"Potion of Speed": 1, "Potion of Dexterity": 1, "Potion of Wisdom": 1, "Potion of Vitality": 1, "Holy Water": 1}, ["Clothing Dye Remover", "Accessory Dye Remover"]],
    ["Potion Fusion: Att", {"Potion of Attack": 3, "Greater Potion of Attack": 1}, ["Potion of Defense", "Potion of Defense", "Potion of Defense", "Greater Potion of Defense"]],
    ["Potion Fusion: Spd", {"Potion of Speed": 3, "Greater Potion of Speed": 1}, ["Potion of Dexterity", "Potion of Dexterity", "Potion of Dexterity", "Greater Potion of Dexterity"]],
    ["Potion Fusion: Vit", {"Potion of Vitality": 3, "Greater Potion of Vitality": 1}, ["Potion of Wisdom", "Potion of Wisdom", "Potion of Wisdom", "Greater Potion of Wisdom"]],
    ["Potion Fusion: Life", {"Potion of Life": 3, "Greater Potion of Life": 1}, ["Potion of Mana", "Potion of Mana", "Potion of Mana", "Greater Potion of Mana"]],
  ],
  "Temporary Craft": [
    ["Full House", {"The Devil Tarot Card": 1, "The Sun Tarot Card": 1, "Death Tarot Card": 1, "The Tower Tarot Card": 1, "The Magician Tarot Card": 1, "The World Tarot Card": 1, "The Chariot Tarot Card": 1, "The Moon Tarot Card": 1}, ["Lucky Clover", "Treasure Map"]],
    ["Wild Card", {"The Fool Tarot Card": 1}, ["Mystery Stat Pot"]],
    ["Path of the Ancients", {"Golden Ankh": 1, "Eye of Osiris": 1, "Pharaoh's Mask": 1}, ["Gold Bar"]],
    ["Secrets of the Seas", {"Golden Cockle": 1, "Golden Conch": 1, "Golden Horn Conch": 1}, ["Gold Bar"]],
    ["Demonology", {"Golden Femur": 1, "Golden Ribcage": 1, "Golden Skull": 1}, ["Gold Bar"]],
    ["Bounty of the Bay", {"Pearl Necklace": 1, "Golden Chalice": 1, "Ruby Gemstone": 1}, ["Gold Bar"]],
    ["Mind your Manors", {"Golden Candelabra": 1, "Holy Cross": 1}, ["Gold Bar"]],
    ["For Science", {"Golden Nut": 1, "Golden Bolt": 1}, ["Gold Bar"]],
  ],
};

/** Where each mark drops (from the RealmEye wiki): mark -> [dungeon, boss] */
export const MARK_SOURCES: Record<string, [dungeon: string, boss: string]> = {
  "Mark of Stheno": ["Snake Pit", "Stheno the Snake Queen"],
  "Mark of Gulpord": ["Toxic Sewers", "Gulpord the Slime God"],
  "Mark of Malphas": ["Abyss of Demons", "Archdemon Malphas"],
  "Mark of Limon": ["Sprite World", "Limon the Sprite Goddess"],
  "Mark of Septavius": ["Undead Lair", "Septavius the Ghost God"],
  "Mark of the Puppet Master": ["Theatre", "Puppet Master"],
  "Mark of the Fountain Spirit": ["Magic Woods", "Fountain Spirit"],
  "Mark of the Archivist": ["Cursed Library", "Avalon the Archivist"],
  "Mark of Dreadstump": ["Pirate Cave", "Dreadstump the Pirate King"],
  "Mark of Mama Megamoth": ["Forest Maze", "Mama Megamoth"],
  "Mark of Arachna": ["Spider Den", "Arachna the Spider Queen"],
  "Mark of Mixcoatl": ["Forbidden Jungle", "Mixcoatl"],
  "Mark of the Queen Bee": ["Hive", "Queen Bee"],
  "Mark of the Sandstone Titan": ["Ancient Ruins", "Sandstone Titan"],
  "Mark of Skuld": ["Haunted Cemetery", "Ghost of Skuld"],
  "Mark of Ruthven": ["Manor of the Immortals", "Lord Ruthven"],
  "Mark of Dr Terrible": ["Mad Lab", "Dr Terrible"],
  "Mark of Daichi": ["Mountain Temple", "Daichi the Fallen"],
  "Mark of the Effigy": ["Cave of a Thousand Treasures", "Golden Oryx Effigy"],
  "Mark of Bilgewater": ["Deadwater Docks", "Jon Bilgewater the Pirate King"],
  "Mark of the Megamoth": ["Woodland Labyrinth", "Megamoth"],
  "Mark of the Son of Arachna": ["Crawling Depths", "Son of Arachna"],
  "Mark of Thessal": ["Ocean Trench", "Thessal the Mermaid Goddess"],
  "Mark of Parasitic Horrors": ["Parasite Chambers", "Nightmare Colony"],
  "Mark of Davy Jones": ["Davy Jones’ Locker", "Davy Jones"],
  "Mark of the Wyvern": ["Lair of Draconis", "Ivory Wyvern"],
  "Mark of Esben": ["Ice Citadel", "Esben the Neurotic"],
  "Mark of Geb": ["Tomb of the Ancients", "Geb"],
  "Mark of Oryx": ["Oryx’s Chamber", "Oryx the Mad God"],
  "Mark of the Tesseract Goddess": ["Third Dimension", "Tesseract Goddess"],
  "Mark of the Wetlands": ["Sulfurous Wetlands", "Heart of the Wetlands"],
  "Mark of Janus": ["Oryx’s Castle", "Janus the Doorwarden"],
  "Mark of the Killer Bee Queen": ["Nest", "Killer Bee Queen"],
  "Mark of the Forgotten King": ["Shatters", "Forgotten King"],
  "Mark of the Marble Colossus": ["Lost Halls", "Marble Colossus"],
  "Mark of Malus": ["Cultist Hideout", "Malus"],
  "Mark of the Void Entity": ["Void", "Void Entity"],
  "Mark of the Crystal Entity": ["Crystal Cavern", "Crystal Entity"],
};

export const CATEGORIES = Object.keys(QUEST_DATA) as QuestCategory[];

export const QUESTS: Quest[] = CATEGORIES.flatMap(category =>
  QUEST_DATA[category].map(([name, needs, rewards]) => ({ name, category, needs, rewards })),
);
