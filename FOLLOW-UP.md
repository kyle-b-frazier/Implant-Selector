# Follow-up list

Open questions from the October 2026 catalog check. Each one needs a manufacturer rep (or a newer catalog) to settle. Items marked ⚠ show a "Please confirm before adding" prompt in the app until they're resolved. When one is settled, update the file in `catalog/`, delete its `caution`, and tick it off here.

Every part group in the app shows the catalog page its article numbers come from ("Source: …"). Groups with a number that isn't in any of these catalogs also show "⚠ … confirm before ordering"; there are nine such groups, all covered below. The test suite lists them too, so a new unsourced part fails `npm test`.

Catalogs used: Straumann iEXCEL Product Catalog 2026 (450.036), Straumann Product Catalog 2022/2023 Special Edition (452.201), Nobel Biocare Product Catalog 2024/2025, Nobel S series brochure MKT-6268 Rev 00 (Jan 2026), Neodent 2026 Product Catalog (CALIT.2040), and Neodent Grand Morse Catalog 2018. Page numbers are the catalog's own.

## Straumann

- [ ] ⚠ **BLC Ø4.5 implant: RB or WB?** The iEXCEL 2026 catalog lists 035.94xxS (SLActive) as **WB** on p.5 but 035.84xxS (SLA) as **RB** on p.7. The app treats both as WB, so it pairs them with WB closure caps, healing abutments and impression posts. Ask Straumann which platform the BLC Ø4.5 has.
- [x] **XL anatomic healing abutments Ø5.5/Ø6.5 (064.8482S, 064.4510S, 064.4522S, 064.4523S): WB only.** Settled October 2026. iEXCEL 2026 (p.28) lists every XL size as RB/WB, but Straumann's AHA XC technical information (707883) says Ø5.5 and Ø6.5 are WB only ("Do not place WB AHAs on RB implants"), and the 2025 recall of 064.4522S/064.4523S (FDA Z-1671-2025, Health Canada) was for blister labels that wrongly read "RB/WB". The app offers them for WB implants only.

## Nobel Biocare

- [ ] ⚠ **Locator R-Tx NP 6mm.** The app has REF30506-06; the 2024/2025 catalog (p.77) lists **REF30506-07**. The rest of the series suggests -06 may be right and the catalog may have a misprint. Ask Nobel.
- [ ] ⚠ **NobelZygoma TiUltra twist and pilot drills.** The catalog page (p.46) has a misprint: the Pilot Drill Ø3.5 row repeats 301605 and lists 88521, which is the TiUnite PureSet number. The catalog also gives Twist Drill Ø2.9 as Regular 301603 / Short 301602, the reverse of the app. 301606/301607, which the app uses for Twist Drill Ø3.5, aren't in the catalog. Ask Nobel for the correct numbers.
- [ ] **Not in the 2024/2025 catalog:** zygoma healing abutments 32332/32333 (app: for TiUnite 45°/60° multi-unit abutments) and lab prosthetic screw 38420 (1/pkg). Confirm they're still sold, or remove them.
- [ ] **S series: US availability.** The S series brochure you uploaded (MKT-6268 Rev 00, Jan 2026) says on its cover that *all* S series implants and components are under FDA 510(k) and Health Canada review and not for sale in the US. The app follows a later North American brochure (96517 NA 2603, Mar 2026) that lists the implants, healing abutments, impression copings and scan bodies as available, with only the temporary abutments and Universal Base ASC still pending. The app's header note for the S series now says this. Ask Nobel what is orderable in the US today.
- [ ] **S series guided surgery parts** (implant mounts 302565/302583/302567/302568, template abutments 302569/302570) aren't in the January brochure. Every other S series article number in the app matches it (pp.26–29).

## Neodent

Checked against the Neodent 2026 Product Catalog (CALIT.2040). It confirms 180 of the app's 182 Neodent article numbers, and it supersedes the 2018 catalog wherever the two differ.

- [ ] ⚠ **Implant analog sizes.** The 2026 catalog lists **101.103 = Ø3.5/3.75** and **101.089 = Ø4.0/4.3**, consistently in six places (pp.21, 23, 25 and its index); the app follows it. The 2018 catalog lists them the other way round. Neither edition lists an analog for **Ø7.0** implants: 101.090 is Ø5.0/6.0, so the wizard offers no analog for a Ø7.0 implant. Ask Neodent which analog each size uses.
- [ ] ⚠ **Neotorque coping screw for GM Abutment.** The 2026 catalog (p.18) prints 116.266 for both the titanium and the Neotorque screw. The app shows the Neotorque one as 116.267, which the catalog doesn't contain. Ask Neodent for the Neotorque number.
- [ ] **DirectFit screw 116.303** isn't in the 2026 catalog, which only links to a DirectFit Screw DME file. Confirm the article number.

## Gaps (filled October 2026)

- [x] **Zygoma healing caps and temporary coping.** Added to both zygoma systems: titanium healing caps 300162–300167 and temporary coping 29046 (Nobel 2024/2025 p.126, "compatible with all multi-unit abutments except multi-unit abutment Brånemark WP"; the zygoma abutments are all RP). The case builder and All-on-X builder now offer them. The Snap coping 38915 is left out: p.126 limits it to Multi-unit Abutment Xeal for CC and TCC.
- [x] **BLT RC basal screws** 025.4900, 025.4906, 025.4908 added to Replacement Screws (Straumann 2022/2023 p.222).
- [x] **BLC/BLX WB ∅6.0mm healing abutment** GH 2.5 versions 064.8217S/064.8218S added (iEXCEL 2026 p.27).

## Repository housekeeping (PDF removal)

- [ ] In GitHub → Actions, delete workflow runs #6 and #7 ("Add files via upload"). Their site bundles included the catalog PDFs. They expire on their own, but deleting the runs removes them now.
- [ ] The two removed commits (4b4b5e1, 36509b5) can still be opened by direct link for a while. If you want them gone completely, GitHub Support can purge them ("Removing sensitive data from a repository" in GitHub's docs).
