export type PortfolioCategory =
  | "Wedding"
  | "Newborn"
  | "Maternity"
  | "Models"
  | "Wildlife";

export type PortfolioImage = {
  id: string;
  category: PortfolioCategory;
  title: string;
  src: string;
  orientation: "portrait" | "landscape" | "square";
  description?: string;
};

export const portfolioImages: PortfolioImage[] = [
  // Weddings
  { id: "w22", category: "Wedding", title: "Wedding Blessings", src: "/images/portfolio/82.jpg", orientation: "landscape" },
  { id: "w23", category: "Wedding", title: "Together Down the Aisle", src: "/images/portfolio/152.jpg", orientation: "landscape" },
  { id: "w24", category: "Wedding", title: "A Ring of Promise", src: "/images/portfolio/173.jpg", orientation: "landscape" },
  { id: "w7", category: "Wedding", title: "Tender Embrace", src: "/images/portfolio/1Q6A3062.jpg", orientation: "landscape" },
  { id: "w8", category: "Wedding", title: "Garden Arrival", src: "/images/portfolio/1Q6A3180.jpg", orientation: "portrait" },
  { id: "w9", category: "Wedding", title: "Bridal Grace", src: "/images/portfolio/1Q6A3186.jpg", orientation: "portrait" },
  { id: "w10", category: "Wedding", title: "Golden Path", src: "/images/portfolio/1Q6A3220.jpg", orientation: "landscape" },
  { id: "w11", category: "Wedding", title: "Henna Details", src: "/images/portfolio/3.jpg", orientation: "landscape" },
  { id: "w12", category: "Wedding", title: "Rings of Promise", src: "/images/portfolio/14.jpg", orientation: "landscape" },
  { id: "w13", category: "Wedding", title: "Bridal Ornament", src: "/images/portfolio/19.jpg", orientation: "landscape" },
  { id: "w14", category: "Wedding", title: "Garden Stroll", src: "/images/portfolio/BSK_9929.jpg", orientation: "portrait" },
  { id: "w15", category: "Wedding", title: "Joined Hands", src: "/images/portfolio/BSK_9950.jpg", orientation: "landscape" },
  { id: "w16", category: "Wedding", title: "Royal Portrait", src: "/images/portfolio/DSC_0592.jpg", orientation: "portrait" },
  { id: "w17", category: "Wedding", title: "Garden Walk", src: "/images/portfolio/DSC_6129.jpg", orientation: "portrait" },
  { id: "w18", category: "Wedding", title: "Bridal Radiance", src: "/images/portfolio/DSC_6277.jpg", orientation: "landscape" },
  { id: "w19", category: "Wedding", title: "Sacred Vows", src: "/images/portfolio/DSC_7551.jpg", orientation: "landscape" },
  { id: "w20", category: "Wedding", title: "Crimson Portrait", src: "/images/portfolio/DSC_8798.jpg", orientation: "landscape" },
  { id: "w21", category: "Wedding", title: "Midnight Embrace", src: "/images/portfolio/DSC_9236.jpg", orientation: "landscape" },

  // Maternity
  { id: "m1", category: "Maternity", title: "Peacock Feather Grace", src: "/images/portfolio/maternity/1.jpg", orientation: "portrait" },
  { id: "m2", category: "Maternity", title: "Ivory and Gold Elegance", src: "/images/portfolio/maternity/3.jpg", orientation: "portrait" },
  { id: "m3", category: "Maternity", title: "Crimson Gown in Bloom", src: "/images/portfolio/maternity/16.jpg", orientation: "landscape" },
  { id: "m4", category: "Maternity", title: "A Tender Touch in Denim", src: "/images/portfolio/maternity/18 (1).jpg", orientation: "portrait" },
  { id: "m5", category: "Maternity", title: "Boy or Girl?", src: "/images/portfolio/maternity/18.jpg", orientation: "landscape" },
  { id: "m6", category: "Maternity", title: "Together in Crimson", src: "/images/portfolio/maternity/26.jpg", orientation: "portrait" },
  { id: "m7", category: "Maternity", title: "Motherhood in Monochrome", src: "/images/portfolio/maternity/47.jpg", orientation: "portrait" },
  { id: "m8", category: "Maternity", title: "A Gentle Kiss in Blue", src: "/images/portfolio/maternity/49.jpg", orientation: "portrait" },
  { id: "m9", category: "Maternity", title: "Love in Silhouette", src: "/images/portfolio/maternity/50.jpg", orientation: "portrait" },

  { id: "m10", category: "Maternity", title: "Emerald Saree Grace", src: "/images/portfolio/maternity/27.jpg", orientation: "portrait" },
  { id: "m11", category: "Maternity", title: "Together in Ivory and Gold", src: "/images/portfolio/maternity/6.jpg", orientation: "portrait" },
  { id: "m12", category: "Maternity", title: "Love Among Peacock Feathers", src: "/images/portfolio/maternity/44.jpg", orientation: "landscape" },

  // Newborn
  { id: "n1", category: "Newborn", title: "Rustic Bowl Slumber", src: "/images/portfolio/newborn-01.jpg", orientation: "landscape", description: "Warm mohair knitted wrap in hand-carved wood" },
  { id: "n2", category: "Newborn", title: "Tender Tiny Dreams", src: "/images/portfolio/newborn-02.jpg", orientation: "portrait", description: "Peaceful sleep in soothing cream tones" },
  { id: "n3", category: "Newborn", title: "Little Hands, Big World", src: "/images/portfolio/newborn-03.jpg", orientation: "landscape", description: "Close-up macro detail of baby toes and fingers" },
  { id: "n5", category: "Newborn", title: "Alpine Adventure", src: "/images/portfolio/baby/3.jpg", orientation: "portrait", description: "A tiny explorer nestled in a snowy mountain scene" },
  { id: "n6", category: "Newborn", title: "Little Doctor Dreams", src: "/images/portfolio/baby/12.jpg", orientation: "square", description: "A peaceful newborn styled with a tiny stethoscope" },
  { id: "n7", category: "Newborn", title: "Peacock Nest", src: "/images/portfolio/baby/35.jpg", orientation: "landscape", description: "A sleeping baby wrapped in warm gold and peacock blue" },
  { id: "n8", category: "Newborn", title: "Blue Feather Prince", src: "/images/portfolio/baby/DSC_2069.jpg", orientation: "landscape", description: "A serene newborn portrait with blue feather details" },
  { id: "n9", category: "Newborn", title: "Peacock Blue Dreams", src: "/images/portfolio/baby/DSC_2084.jpg", orientation: "landscape", description: "A softly styled newborn portrait in rich peacock blue" },
  { id: "n10", category: "Newborn", title: "Tiny Aviator", src: "/images/portfolio/baby/photo 2.jpg", orientation: "landscape", description: "A little pilot resting in a charming aviation setup" },
  { id: "n11", category: "Newborn", title: "Floral Blue Nest", src: "/images/portfolio/baby/photo 22.jpg", orientation: "landscape", description: "A newborn sleeping peacefully among blue florals" },
  { id: "n12", category: "Newborn", title: "Dream Circle", src: "/images/portfolio/baby/photo 49.jpg", orientation: "landscape", description: "A floral dreamscape created around a sleeping newborn" },
  { id: "n13", category: "Newborn", title: "Winter Wonderland", src: "/images/portfolio/baby/photo 125.jpg", orientation: "landscape", description: "A magical winter portrait with snowy trees and soft light" },
  { id: "n14", category: "Newborn", title: "Midnight Window", src: "/images/portfolio/baby/photo 166.jpg", orientation: "landscape", description: "A cozy newborn portrait framed by a moonlit window scene" },

  // Models & Fashion
  { id: "mo13", category: "Models", title: "Curls and Confidence", src: "/images/portfolio/Models/DSC04441.JPG", orientation: "portrait", description: "A close-up studio portrait pairs soft curls with black satin and a confident gaze." },
  { id: "mo14", category: "Models", title: "Golden Glamour", src: "/images/portfolio/Models/DSC04462.JPG", orientation: "portrait", description: "A full-length portrait of a shimmering gold gown, finished with a sparkling tiara." },
  { id: "mo15", category: "Models", title: "Playful in Pink", src: "/images/portfolio/Models/DSC_5116.JPG", orientation: "portrait", description: "Pink trousers, a colourful tie-front top and a wide-brimmed hat bring playful energy to the studio." },
  { id: "mo16", category: "Models", title: "A Moment in Marigold", src: "/images/portfolio/Models/DSC_5233.JPG", orientation: "landscape", description: "A relaxed reclining pose pairs a flowing marigold saree with a vivid pink blouse." },
  { id: "mo17", category: "Models", title: "Sunflower Muse", src: "/images/portfolio/Models/DSC_5289.JPG", orientation: "portrait", description: "A sunflower adds a playful focal point to a marigold saree and pink bow-detail blouse." },
  { id: "mo18", category: "Models", title: "A Turn of Grace", src: "/images/portfolio/Models/DSC_8087.JPG", orientation: "landscape", description: "An over-the-shoulder smile and a graceful hand gesture highlight a green and orange traditional ensemble." },
  { id: "mo6", category: "Models", title: "Poise in Black", src: "/images/portfolio/Models/DSC04432.JPG", orientation: "portrait", description: "Soft curls and a black satin outfit in a quietly confident studio portrait." },
  { id: "mo7", category: "Models", title: "Crowned in Gold", src: "/images/portfolio/Models/DSC04460.JPG", orientation: "portrait", description: "A sparkling gold gown and tiara bring a touch of glamour to the studio." },
  { id: "mo8", category: "Models", title: "The Statement Suit", src: "/images/portfolio/Models/DSC_4803.JPG", orientation: "portrait", description: "A tailored black suit, statement jewellery and pink platform heels create a bold fashion look." },
  { id: "mo9", category: "Models", title: "Editorial Edge", src: "/images/portfolio/Models/DSC_4810.JPG", orientation: "portrait", description: "A poised profile pairs sharp black tailoring with sculptural silver jewellery." },
  { id: "mo10", category: "Models", title: "Tradition in Colour", src: "/images/portfolio/Models/DSC_8040.JPG", orientation: "landscape", description: "Rich green and orange traditional attire stands out against softly draped curtains." },
  { id: "mo11", category: "Models", title: "A Graceful Greeting", src: "/images/portfolio/Models/DSC_8097.JPG", orientation: "landscape", description: "Folded hands and a gentle smile frame an elegant portrait in green and gold." },
  { id: "mo12", category: "Models", title: "Joy in Every Gesture", src: "/images/portfolio/Models/DSC_8126.JPG", orientation: "landscape", description: "Expressive hands, gold jewellery and a bright smile bring this traditional look to life." },

  // Wildlife
  { id: "wl1", category: "Wildlife", title: "Wildlife Study 01", src: "/images/portfolio/animals/1.jpg", orientation: "landscape" },
  { id: "wl2", category: "Wildlife", title: "Wildlife Study 02", src: "/images/portfolio/animals/4.jpg", orientation: "landscape" },
  { id: "wl3", category: "Wildlife", title: "Wildlife Study 03", src: "/images/portfolio/animals/5.jpg", orientation: "landscape" },
  { id: "wl4", category: "Wildlife", title: "Wildlife Study 04", src: "/images/portfolio/animals/bidee.jpg", orientation: "landscape" },
  { id: "wl5", category: "Wildlife", title: "Wildlife Study 05", src: "/images/portfolio/animals/bie.jpg", orientation: "landscape" },
  { id: "wl6", category: "Wildlife", title: "Wildlife Study 06", src: "/images/portfolio/animals/biggg.jpg", orientation: "landscape" },
  { id: "wl7", category: "Wildlife", title: "Wildlife Study 07", src: "/images/portfolio/animals/birdw.jpg", orientation: "landscape" },
  { id: "wl8", category: "Wildlife", title: "Wildlife Study 08", src: "/images/portfolio/animals/birr.jpg", orientation: "landscape" },
  { id: "wl9", category: "Wildlife", title: "Wildlife Study 09", src: "/images/portfolio/animals/DSC02759_1.jpg", orientation: "landscape" },

];

export const portfolioCategories: (PortfolioCategory | "All")[] = [
  "All",
  "Wedding",
  "Newborn",
  "Maternity",
  "Models",
  "Wildlife",
];
