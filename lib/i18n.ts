import { defineI18n } from 'fumadocs-core/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';

export const i18n = defineI18n({
  languages: ['en', 'bn'],
  defaultLanguage: 'en',
  parser: 'dir',
});

export const languages = [
  { locale: 'en', name: 'English' },
  { locale: 'bn', name: 'বাংলা' },
];

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: {
      displayName: 'English',
    },
    bn: {
      displayName: 'বাংলা',
      'Toggle Theme(theme switcher)(aria-label)': 'থিম বদলান',
      'Dark(theme switcher)(aria-label)': 'ডার্ক',
      'Light(theme switcher)(aria-label)': 'লাইট',
      'System(theme switcher)(aria-label)': 'সিস্টেম',
      'Open Search(search trigger)(aria-label)': 'খুঁজুন',
      'Search(search trigger)': 'খুঁজুন',
      'Choose a language(language switcher)': 'একটি ভাষা বেছে নিন',
      'Choose a language(language switcher)(aria-label)':
        'একটি ভাষা বেছে নিন',
      'Language(language switcher)': 'ভাষা',
      'Next Page(pagination)': 'পরবর্তী পৃষ্ঠা',
      'Previous Page(pagination)': 'আগের পৃষ্ঠা',
      'On this page(table of contents)': 'এই পৃষ্ঠায়',
      'No Headings(table of contents)': 'কোনো শিরোনাম নেই',
      'Last updated on(page footer)': 'সর্বশেষ হালনাগাদ',
      'Edit on GitHub(edit page)': 'গিটহাবে সম্পাদনা করুন',
      'View as Markdown(page actions)': 'মার্কডাউন হিসেবে দেখুন',
      'Copy Markdown(page actions)': 'মার্কডাউন কপি করুন',
      'Copied Markdown(page actions)': 'মার্কডাউন কপি হয়েছে',
      'Copy Text(code block)(aria-label)': 'কোড কপি করুন',
      'Copied Text(code block)(aria-label)': 'কোড কপি হয়েছে',
      'Open Sidebar(aria-label)': 'সাইডবার খুলুন',
      'Close Sidebar(aria-label)': 'সাইডবার বন্ধ করুন',
      'Show Sidebar(sidebar)': 'সাইডবার দেখান',
      'Hide Sidebar(sidebar)': 'সাইডবার লুকান',
      'Collapse Sidebar(sidebar)(aria-label)': 'সাইডবার ধস',
      'Open Sidebar(sidebar)(aria-label)': 'সাইডবার খুলুন',
      'Close Sidebar(sidebar)(aria-label)': 'সাইডবার বন্ধ করুন',
      'No results found(search dialog)': 'কোনো ফলাফল পাওয়া যায়নি',
      'Search(search dialog)': 'খুঁজুন',
      'Close Search(search dialog)(aria-label)': 'খোঁজা বন্ধ করুন',
      'Layout Tab(layout tab trigger)': 'লেআউট ট্যাব',
      'Toggle Menu(home layout header)(aria-label)': 'মেনু বদলান',
      'Theme(site menu)': 'থিম',
      'Page Not Found(404 not found page)': 'পৃষ্ঠাটি পাওয়া যায়নি',
      'Back to Home(404 not found page)': 'হোমে ফিরুন',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 not found page)':
        'আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন হয়েছে, বা সাময়িকভাবে অনুপলব্ধ।',
      'Copy Anchor Link(heading anchor)(aria-label)': 'লিংক কপি করুন',
      'Copied Anchor Link(heading anchor)(aria-label)': 'লিংক কপি হয়েছে',
      'Copied Link(accordion)(aria-label)': 'লিংক কপি হয়েছে',
      'Copy Link(accordion)(aria-label)': 'লিংক কপি করুন',
      'Close Banner(banner)(aria-label)': 'ব্যানার বন্ধ করুন',
      'Open in ChatGPT(page actions)': 'ChatGPT-তে খুলুন',
      'Open in Claude(page actions)': 'Claude-এ খুলুন',
      'Open in Cursor(page actions)': 'Cursor-এ খুলুন',
      'Open in GitHub(page actions)': 'GitHub-এ খুলুন',
    },
  });