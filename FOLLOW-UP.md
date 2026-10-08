# Follow-up list

Open questions from the October 2026 catalog check. Each one needs a manufacturer rep (or a newer catalog) to settle. Items marked ⚠ show a "Please confirm before adding" prompt in the app until they're resolved. When one is settled, update `catalog.js`, delete its `caution`, and tick it off here.

Catalogs used: Straumann iEXCEL Product Catalog 2026 (450.036), Straumann Product Catalog 2022/2023 Special Edition (452.201), Nobel Biocare Product Catalog 2024/2025, and Neodent Grand Morse Catalog **2018**. Page numbers are the catalog's own.

## Straumann

- [ ] ⚠ **BLC Ø4.5 implant: RB or WB?** The iEXCEL 2026 catalog lists 035.94xxS (SLActive) as **WB** on p.5 but 035.84xxS (SLA) as **RB** on p.7. The app treats both as WB, so it pairs them with WB closure caps, healing abutments and impression posts. Ask Straumann which platform the BLC Ø4.5 has.
- [ ] **XL anatomic healing abutments Ø5.5/Ø6.5 (064.8482S, 064.4510S, 064.4522S, 064.4523S).** The app now follows the iEXCEL 2026 catalog (p.28), which lists every XL size as **RB/WB**. The previous version limited these to WB, citing a 2025 recall of 064.4522S/064.4523S blister labels that couldn't be verified. Ask Straumann whether Ø5.5/Ø6.5 XL fit RB implants.

## Nobel Biocare

- [ ] ⚠ **Locator R-Tx NP 6mm.** The app has REF30506-06; the 2024/2025 catalog (p.77) lists **REF30506-07**. The rest of the series suggests -06 may be right and the catalog may have a misprint. Ask Nobel.
- [ ] ⚠ **NobelZygoma TiUltra twist and pilot drills.** The catalog page (p.46) has a misprint: the Pilot Drill Ø3.5 row repeats 301605 and lists 88521, which is the TiUnite PureSet number. The catalog also gives Twist Drill Ø2.9 as Regular 301603 / Short 301602, the reverse of the app. 301606/301607, which the app uses for Twist Drill Ø3.5, aren't in the catalog. Ask Nobel for the correct numbers.
- [ ] **Not in the 2024/2025 catalog:** zygoma healing abutments 32332/32333 (app: for TiUnite 45°/60° multi-unit abutments), lab prosthetic screw 38420 (1/pkg), and S series "Multi-unit Abutment, NP" 301950. Confirm they're still sold, or remove them.
- [ ] **S series (NobelActive S / NobelParallel S / NobelReplace S)** isn't in the 2024/2025 catalog. Only the parts it shares with the conical connection line could be checked (cover screw, bridge healing abutment, bridge impression coping, Xeal multi-unit abutments, esthetic abutments, titanium blanks, healing caps). Everything else still rests on the S series brochure (96517 NA 2603).

## Neodent

The uploaded Neodent catalog is the **2018** edition, while the app's Neodent data cites a 2026 catalog, so differences may just be newer numbers. Getting the current Grand Morse catalog would settle all of these at once.

- [ ] ⚠ **Screwdrivers.** In the 2018 catalog (p.42), Neo Screwdriver Torque Connection short 105.133 is 20mm (app says 16.5mm), medium 105.132 is 25mm (app 22mm), and long is 105.134 at 38mm (app 105.157 at 32mm). Neo Manual Screwdriver short 104.058 is 20mm (app 21mm), and long is 104.059 at 38mm (app 104.070 at 37mm).
- [ ] **Numbers that differ from the 2018 catalog** (no warning in the app yet):
  - GM Exact Abutment: 2018 has GH 0.8–5.5 = 115.237–115.242; app has GH 0.8–4.5 = 115.269–115.273 (p.21)
  - Exact Mini Conical 17°/30°: 2018 has 115.249–251 / 115.252–254; app has 115.275–277 / 115.278–280 (p.23)
  - Tapered drills Ø3.5–5.0: 2018 has 103.399, 103.402, 103.405, 103.408, 103.411; app has 103.513–103.517 (p.40)
  - Scanbodies: 2018 GM implant intraoral is 108.183 (app 108.207); Mini Conical is 108.137 intraoral / 108.094 model (app 108.218 / 118.410); Micro is 108.140 / 108.102 (app 108.219) (p.54)
  - Protection cylinders: 2018 Mini Conical is 106.220 (app 106.268 Regular, 106.278 Wide); Micro is 106.219 (app 106.267) (p.23, p.25)
  - Depth probe: 2018 is 129.004 (app 129.034) (p.58)
- [ ] **Not in the 2018 catalog at all:** Ø7.0 implants (140/109.1059–1062), customizable healing abutments 106.223–106.232, Neo GM screws 116.290–116.292, coping screws 116.267/116.270, DirectFit screw 116.303, digital crown coping 118.362, GM Abutment scanbody 108.220. Also unconfirmed: whether analog 101.090 covers Ø7.0 (2018 lists it for Ø5.0/6.0).

## Gaps (not errors, nothing changed)

- **Zygoma healing caps and temporary copings.** Nobel's catalog says zygoma multi-unit abutments use the standard multi-unit prosthetic parts (p.122–126), including the titanium healing caps 300162–300167 and temporary coping 29046. The app doesn't offer these for zygoma cases.
- **BLT:** no RC basal screw in Replacement Screws.
- **BLC/BLX:** the WB ∅6.0mm healing abutment group is missing its GH 2.5 versions (064.8217S/064.8218S, iEXCEL p.27).

## Repository housekeeping (PDF removal)

- [ ] In GitHub → Actions, delete workflow runs #6 and #7 ("Add files via upload"). Their site bundles included the catalog PDFs. They expire on their own, but deleting the runs removes them now.
- [ ] The two removed commits (4b4b5e1, 36509b5) can still be opened by direct link for a while. If you want them gone completely, GitHub Support can purge them ("Removing sensitive data from a repository" in GitHub's docs).
