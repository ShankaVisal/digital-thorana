import type { StaticImageData } from "next/image";

export type StoryScene = {
  sceneNumber: number;
  title: string;
  sinhalaNarration: string;
  englishSummary: string;
  keyMessage: string;
  image: StaticImageData | string;
  audioSrc: string;
};

export const storyMeta = {
  pageTitle: "Tapro IT Digital Vesak Thorana",
  storyTitle: "Nandivisala Jataka",
  tagline: "Kind words bring success.",
  subTagline: "A digital Vesak experience by Tapro IT",
  introText:
    "Experience a timeless lesson of kindness, respect, and gentle speech.",
  moralSinhala:
    "නන්දිවිසාල ජාතකය අපට කියා දෙන වැදගත් පාඩම වන්නේ, කෙනෙකුගේ ශක්තිය හා හැකියාව මතු කරන්නේ කෝපය හෝ අවමන් නොව, කරුණාව, ගෞරවය සහ මෘදු වචන බවයි.",
  moralEnglish:
    "The Nandivisala Jataka teaches us that kindness, respect, and gentle speech can bring out the best in others. Harsh words may weaken even the strongest, but kind words can lead to success.",
  quote: "Kind words bring success.",
  shareMessage:
    "Experience the Nandivisala Jataka Digital Vesak Thorana by Tapro IT. Kind words bring success.",
  vesakWish:
    "May this Vesak bring peace, wisdom, kindness, and joy to you and your loved ones.",
  website: "https://www.taproit.com",
  contact: {
    phone: "077 177 5703",
    email: "info@taproit.com",
    website: "www.taproit.com",
  },
};

export const nandivisalaScenes: StoryScene[] = [
  {
    sceneNumber: 1,
    title: "The Kind Brahmin and Nandivisala",
    sinhalaNarration:
      "එක් කාලයක කරුණාවන්ත බ්‍රාහ්මණයෙක් නන්දිවිසාල නම් වසු පැටියෙකු තම දරුවෙකු මෙන් ආදරයෙන් රැක බලා ගත්තේය. ඔහු නන්දිවිසාලට ආහාර දුන්නේත්, ආදරයෙන් කතා කළේත්, ගෞරවයෙන් හැසිරුණේත්ය.",
    englishSummary:
      "A kind Brahmin raised Nandivisala with love and care, treating him like his own child.",
    keyMessage: "Love and kindness build trust.",
    image: "/images/n1.png",
    audioSrc: "/audio/scene-1.mp3",
  },
  {
    sceneNumber: 2,
    title: "Nandivisala’s Gratitude",
    sinhalaNarration:
      "කාලය ගතවූ විට නන්දිවිසාල ශක්තිමත් මහා වෘෂභයෙකු විය. තම ස්වාමියාගේ කරුණාවට ස්තුති කිරීමට ඔහු සිතුවේය. එබැවින් බ්‍රාහ්මණයාට ධනය ලබා දීමට තමාට හැකි බව නන්දිවිසාල පැවසීය.",
    englishSummary:
      "When Nandivisala grew strong, he wanted to repay the Brahmin’s kindness.",
    keyMessage: "Gratitude is a noble quality.",
    image: "/images/n2.png",
    audioSrc: "/audio/scene-2.mp3",
  },
  {
    sceneNumber: 3,
    title: "The First Challenge",
    sinhalaNarration:
      "නන්දිවිසාලගේ ශක්තිය පෙන්වීමට බ්‍රාහ්මණයා ගම්වැසියන් ඉදිරියේ ඔහුට බර රථ ගණනක් ඇදීමට ඉල්ලා සිටියේය. නමුත් ඒ අවස්ථාවේ බ්‍රාහ්මණයා කෝපයෙන් හා कठෝර වචනවලින් නන්දිවිසාලට කතා කළේය.",
    englishSummary:
      "The Brahmin challenged Nandivisala to pull many heavy carts, but he spoke harshly.",
    keyMessage: "Harsh words can break confidence.",
    image: "/images/n3.png",
    audioSrc: "/audio/scene-3.mp3",
  },
  {
    sceneNumber: 4,
    title: "Failure Through Harsh Words",
    sinhalaNarration:
      "අවමන් සහිත වචන ඇසූ නන්දිවිසාලගේ සිත දුක් විය. ඔහු රථ ඇදීමට අකමැති විය. බ්‍රාහ්මණයාට පරාජය වී, ඔහුගේ ධනයද අහිමි විය.",
    englishSummary:
      "Hurt by the Brahmin’s harsh words, Nandivisala refused to pull the carts, and the Brahmin lost the challenge.",
    keyMessage: "Disrespect can destroy even great strength.",
    image: "/images/n4.png",
    audioSrc: "/audio/scene-4.mp3",
  },
  {
    sceneNumber: 5,
    title: "The Power of Gentle Speech",
    sinhalaNarration:
      "පසුව බ්‍රාහ්මණයා තම වැරැද්ද තේරුම් ගත්තේය. ඔහු නන්දිවිසාලගෙන් සමාව ඉල්ලා, ආදරයෙන් හා ගෞරවයෙන් කතා කළේය. නැවත අවස්ථාවක් ලබා ගෙන, මෙවර ඔහු මෘදු වචන භාවිත කළේය.",
    englishSummary:
      "The Brahmin realized his mistake and spoke to Nandivisala with kindness and respect.",
    keyMessage: "Kind words awaken strength.",
    image: "/images/n5.png",
    audioSrc: "/audio/scene-5.mp3",
  },
  {
    sceneNumber: 6,
    title: "Kind Words Bring Success",
    sinhalaNarration:
      "මෘදු වචන හා ගෞරවය ඇසූ නන්දිවිසාල සතුටින් සිය ශක්තිය පෙන්වීය. ඔහු බර රථ සියල්ල ඇදගෙන ගොස් බ්‍රාහ්මණයාට ජය ලබා දුන්නේය. මෙම කතාව අපට පෙන්වන්නේ කරුණාවන්ත වචන ජයග්‍රහණයට මඟ පෙන්වන බවයි.",
    englishSummary:
      "With kind words and respect, Nandivisala succeeded and brought victory to the Brahmin.",
    keyMessage: "Respect and kindness can achieve what harsh words cannot.",
    image: "/images/n6.png",
    audioSrc: "/audio/scene-6.mp3",
  },
];