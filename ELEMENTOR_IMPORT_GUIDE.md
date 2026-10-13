# WordPress Elementor Template Import Guide (DMS Bahrain Redesign)
# വേർഡ്പ്രസ് എലമെന്റർ ടെംപ്ലേറ്റ് ഇമ്പോർട്ട് ഗൈഡ്

ഹെഡറും (Navbar) ഫൂട്ടറും (Footer) പൂർണ്ണമായും സെപ്പറേറ്റ് ഫയലുകളായി താഴെ നൽകിയിരിക്കുന്നു:

---

## 📦 1. സെപ്പറേറ്റ് ഹെഡർ & ഫൂട്ടർ ഫയലുകൾ (Separate Header & Footer Files)

നിങ്ങളുടെ വെബ്‌സൈറ്റിന്റെ മെയിൻ ഹെഡറും ഫൂട്ടറും മാത്രം സെപ്പറേറ്റ് ആയി ഡൗൺലോഡ് ചെയ്യാനും ഇമ്പോർട്ട് ചെയ്യാനും:

### 🧭 ഹെഡർ ഫയലുകൾ (Folder: `elementor-templates/01-HEADER/`)
1. **`dms-header-themebuilder.json`**:
   * **Elementor Pro Theme Builder** ഉപയോഗിക്കുന്നവർക്ക് `Theme Builder > Header` ആയി നേരിട്ട് ഇമ്പോർട്ട് ചെയ്യാനുള്ള ഫയൽ (type: "header").
2. **`dms-header-section.json`**:
   * **Elementor Free / Normal Page** ഉപയോഗിക്കുന്നവർക്ക് സാധാരണ സെക്ഷനായി പേജുകളിൽ ചേർക്കാനുള്ള ഫയൽ (type: "section").
   * *സവിശേഷതകൾ:* 6-ാമത്തെ ഇമേജിലെ അതേ ഫ്ലോട്ടിംഗ് ഡാർക്ക് കാപ്സ്യൂൾ ബാർ, ഒറിജിനൽ എമറാൾഡ് ഗ്രീൻ DMS ലോഗോ, നാവിഗേഷൻ മെനു, ബുക്ക് കൺസൾട്ടേഷൻ ബട്ടൺ.

### 🦶 ഫൂട്ടർ ഫയലുകൾ (Folder: `elementor-templates/02-FOOTER/`)
1. **`dms-footer-themebuilder.json`**:
   * **Elementor Pro Theme Builder** വഴി `Theme Builder > Footer` ആയി ഇമ്പോർട്ട് ചെയ്യാനുള്ള ഫയൽ (type: "footer").
2. **`dms-footer-section.json`**:
   * **Elementor Free** വഴി ഏത് പേജിലും സെക്ഷനായി ചേർക്കാനുള്ള ഫയൽ (type: "section").
   * *സവിശേഷതകൾ:* ഒറിജിനൽ ലോഗോ, കോർപ്പറേറ്റ് ഓഫീസ് അഡ്രസ് (Kingdom Tower, Al Hoora), ഫോൺ നമ്പറുകൾ, സർവീസ് ലിങ്കുകൾ.

### ⚡ ഹെഡർ + ഫൂട്ടർ സിപ്പ് പാക്കേജ് (ZIP Package)
* **[`dms-header-and-footer.zip`](file:///g:/DMS%20WEBSITE%20BHARIN/dms%20website/dms-header-and-footer.zip)**:
  ഹെഡറും ഫൂട്ടറും മാത്രമടങ്ങിയ 26 KB സിപ്പ് ഫയൽ.

---

## 📄 2. പേജ് ബോഡി ഫയലുകൾ (Body Content - No Duplicate Header/Footer)

പേജുകളിൽ ഹെഡറും ഫൂട്ടറും ആവർത്തിക്കാതിരിക്കാൻ (Clean Page Body):
* **`dms-homepage-body.json`**: ഹെഡറും ഫൂട്ടറും ഇല്ലാത്ത പ്യുവർ ഹോംപേജ് ബോഡി (Hero with search, 11 Services, Story beats, Accreditations, FAQ).
* **`dms-services-page.json`**: 11 സർവീസുകൾ മാത്രമുള്ള കാപ്പബിലിറ്റീസ് പേജ്.
* **`dms-about-page.json`**: എബൗട്ട് അസ് ബോഡി പേജ്.
* **`dms-contact-page.json`**: കോൺടാക്ട് & കൺസൾട്ടേഷൻ പേജ്.

---

## 🗂️ 3. ഫോൾഡർ സ്ട്രക്ചർ (Workspace Structure)

```text
g:/DMS WEBSITE BHARIN/dms website/
├── elementor-templates/
│   ├── 01-HEADER/
│   │   ├── dms-header-themebuilder.json
│   │   └── dms-header-section.json
│   ├── 02-FOOTER/
│   │   ├── dms-footer-themebuilder.json
│   │   └── dms-footer-section.json
│   ├── 03-PAGES/
│   │   ├── dms-homepage-body.json
│   │   ├── dms-homepage-all-in-one.json
│   │   ├── dms-services-page.json
│   │   ├── dms-about-page.json
│   │   └── dms-contact-page.json
│   └── 04-SECTIONS/
│       ├── dms-hero-search-section.json
│       ├── dms-11-services-grid.json
│       ├── dms-brand-positioning.json
│       ├── dms-story-beats-timeline.json
│       ├── dms-accreditations-bar.json
│       ├── dms-faq-accordion.json
│       └── dms-consultation-form.json
├── downloads/                          <-- direct 1-click download files
├── dms-header-and-footer.zip           <-- Header & Footer only ZIP
└── dms-elementor-templates.zip         <-- Complete Suite ZIP
```

---

## 🚀 വേർഡ്പ്രസ്സിൽ ഇമ്പോർട്ട് ചെയ്യുന്ന വിധം:

### ഹെഡർ ഇമ്പോർട്ട് ചെയ്യാൻ:
1. WordPress Dashboard-ൽ **Templates > Theme Builder** (അല്ലെങ്കിൽ **Saved Templates**) ഓപ്പൺ ചെയ്യുക.
2. **"Import Templates"** ക്ലിക്ക് ചെയ്ത് `dms-header-themebuilder.json` (അല്ലെങ്കിൽ `dms-header-section.json`) അപ്‌ലോഡ് ചെയ്യുക.
3. എലമെന്ററിൽ ഡിസ്‌പ്ലേ കണ്ടീഷൻ **"Entire Site"** നൽകുക.

### ഫൂട്ടർ ഇമ്പോർട്ട് ചെയ്യാൻ:
1. അതേപോലെ **Templates > Theme Builder > Footer** വഴി `dms-footer-themebuilder.json` അപ്‌ലോഡ് ചെയ്യുക.
2. ഡിസ്‌പ്ലേ കണ്ടീഷൻ **"Entire Site"** നൽകുക.

### ലൈവ് വെബ്‌സൈറ്റിൽ നിന്ന് ഡൗൺലോഡ് ചെയ്യാൻ:
നിങ്ങളുടെ ബ്രൗസറിൽ നിലവിൽ ഓപ്പൺ ചെയ്തിട്ടുള്ള **`http://localhost:3000/`** പേജിൽ താഴെ ഇടതുവശത്ത് **"📦 Elementor JSON Downloads"** എന്നൊരു ബട്ടൺ കാണാം. അതിൽ ക്ലിക്ക് ചെയ്താൽ ഈ ഫയലുകൾ ഒരൊറ്റ ക്ലിക്കിൽ ഡൗൺലോഡ് ചെയ്യാൻ സാധിക്കും!
