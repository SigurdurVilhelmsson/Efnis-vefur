# Abstract submissions with SeaTable — setup guide

How to collect, review and approve abstracts for an Efnís conference with
SeaTable's free plan. Written for the 11th conference (2 April 2027), reusable
for later ones. Nothing here touches the website except two CMS fields
(step 8).

Column names and form labels below are **suggestions** (Icelandic / English,
because the conference is bilingual). Help texts are in English only; the
Icelandic versions are marked `TODO(texti)`.

## What you end up with

```
Submitter ──► Web form (public link, closes at the deadline)
                 │
                 ▼
          Table "Ágrip" in base "Efnís 2027 — ágrip"   (data stored in Germany)
                 │
     ┌───────────┼──────────────────┐
     ▼           ▼                  ▼
 "Til yfirferðar"  "Yfirferð" (Kanban:   "Samþykkt" (accepted,
 (to review)       drag cards between    grouped by talk/poster)
                   statuses)                  │
                                              ▼
                                   Export → programme in the CMS ("Dagskrá")
```

The committee works in the base itself, through views. Everyone gets their own
SeaTable login; nobody shares a password.

## 0. Free plan: what you get, what you don't

From seatable.com/prices (checked 2026-09-26):

| Free plan | |
|---|---|
| Users in the team | 25 |
| Rows | 10,000 |
| File storage | 2 GB |
| Automations | 100 runs/month |
| API calls | 3,000/month |
| Snapshots (backups) | kept 1 month |
| Included | web forms, views (incl. private views), view sharing, import/export (CSV, XLSX), notifications, plugins |
| **Not** included (Plus only) | App Builder, per-table/view/column permissions, row locking, form logo/header image |

What this means in practice:

- **Anyone with read-write access can edit every row and column** in the base.
  Keep the committee small and agree on the rule in step 6 ("only touch the
  review columns").
- **Use one base per conference** and share nothing else with the committee.
- **The form can't carry the Efnís logo.** A plain form is fine.

## 1. Account and team (once)

1. Sign up at <https://cloud.seatable.io> with **efnis1@gmail.com**. Name the
   team *Efnafræðifélag Íslands*. This account owns everything, so it doesn't
   depend on one board member.
2. Turn on two-factor authentication for the account. Keep the recovery codes
   with the society's other passwords.
3. Invite a second board member as a team administrator, so there are always
   two people who can manage it. The invite menu is in team administration;
   the exact menu name wasn't in the docs I read, so check it.

## 2. Group and base

Bases belong to a user or to a group. Putting the base in a **group** means
committee members get access by joining the group, and the base survives
people leaving.

1. Create a group: **Ráðstefnunefnd 2027**.
2. Inside the group, create a new empty base: **Efnís 2027 — ágrip**.
3. Rename the first table to **Ágrip**.

## 3. Columns in the table "Ágrip"

### Filled in by the submitter (they appear in the form)

| Column | Type | Required in form | Notes |
|---|---|---|---|
| Titill / Title | Text (first column) | yes | Title of the talk or poster |
| Kynnandi / Presenting author | Text | yes | |
| Netfang / Email | Email | yes | Where the decision is sent |
| Stofnun / Affiliation | Text | yes | Presenting author's institution or company |
| Höfundar / Authors | Long text | yes | All authors and affiliations |
| Tegund / Type | Single select | yes | Options: *Erindi / Talk*, *Veggspjald / Poster*, *Hvort sem er / Either* |
| Tungumál / Language | Single select | yes | Options: *Íslenska*, *English* |
| Ágrip / Abstract | Long text | yes | The abstract as text; see the help text below |
| Skjal / File | File | no | Optional PDF/Word with figures. **Test this first**, see step 5.6 |
| Samþykki / Consent | Checkbox | yes | Consent text in step 5.4 |

Why the abstract goes in as text and not only as a file: reviewers can read it
directly in the table and on the Kanban cards without downloading anything,
and it can be copied straight into the programme booklet.

### Used only by the committee (not in the form)

| Column | Type | Notes |
|---|---|---|
| Staða / Status | Single select | Options in this order: *Innsent*, *Í yfirferð*, *Samþykkt*, *Hafnað*. Set the **default value** to *Innsent*, so new submissions arrive with that status |
| Umsjón / Reviewer | Collaborator | Who is handling it |
| Athugasemdir / Committee notes | Long text | Internal notes; never shown to submitters |
| Samþykkt sem / Accepted as | Single select | *Erindi*, *Veggspjald* |
| Númer / Code | Text | Programme code, e.g. O-01, P-01 (as in the 2024 programme) |
| Innsent / Submitted | Created | Automatic timestamp |

Give the statuses colours (e.g. grey, blue, green, red). They show up on the
Kanban board.

## 4. Test data

Add two or three made-up rows by hand, so the views in step 6 have something to
show. Delete them before the form opens.

## 5. The web form

1. In the base, click **Forms** (top right) → **Add form** → **Traditional
   form**. Name it *Innsending ágripa 2027*.
2. Click the pencil icon to open the editor. Add the submitter columns from
   step 3 in that order (drag them in, or use the plus icon next to each
   column). **Don't** add the committee columns.
3. For each field, set a **display name** (the bilingual label from step 3),
   **required**, and a **help text**:
   - Ágrip / Abstract: *"Max. 300 words. Plain text; no figures (attach a file
     below if needed)."* The word limit is a suggestion; agree it with the
     committee. TODO(texti): Icelandic help text.
   - Höfundar / Authors: *"All authors with affiliations. Underline or mark
     the presenting author."* TODO(texti): Icelandic help text.
4. Consent checkbox label. Suggestion, to be agreed by the board:
   *"I agree that the information in this form is stored by the Icelandic
   Chemical Society (in SeaTable, hosted in Germany), seen by the conference
   committee, and — if the abstract is accepted — published in the conference
   programme."* TODO(texti): Icelandic version.
5. Settings panel on the right:
   - **Submission deadline**: the abstract deadline. The form link stops
     working after it.
   - **Access**: leave it open to anyone with the link. Don't restrict it to
     logged-in SeaTable users; submitters don't have accounts.
   - **Notifications**: send to efnis1@gmail.com (or the committee chair), so
     every submission triggers an email.
   - **Confirmation message**: e.g. *"Thank you — your abstract has been
     received. The committee will contact you by [date]."* TODO(texti):
     Icelandic version.
   - **Custom link**: e.g. `efnis-2027-agrip` (5–30 characters, letters,
     numbers and hyphens).
6. **Test it in a private browser window**, not logged in:
   - Submit the form once with a file attached. Check that the row appears
     with status *Innsent*, that the file arrived, and that the notification
     email came. (The docs don't say whether file uploads work for people
     without a login, or what the size limit is. If they don't work, remove
     the File field and ask for figures by email instead.)
   - Send the form link to one committee member for a yes/no on how it
     looks. If it's rejected: Tally can write into this same table through a
     webhook or Make; nothing else changes.

## 6. Views for the committee

Create these views in the table (view name → **Add view or folder**). Hide
columns the view doesn't need (**Hide columns**).

| View | Type | Filter | Group / sort | Shows |
|---|---|---|---|---|
| **Til yfirferðar** (to review) | Table | Staða is *Innsent* or *Í yfirferð* | Sort by Innsent, oldest first | Title, presenting author, type, reviewer, notes |
| **Yfirferð** (review board) | Kanban | none | Group by **Staða** | Cards: title, presenting author, type, reviewer |
| **Samþykkt** (accepted) | Table | Staða is *Samþykkt* | Group by Samþykkt sem; sort by Númer | Code, title, presenting author, authors, affiliation |
| **Öll ágrip** (all) | Table | none | Sort by Innsent | Everything |

On the Kanban board you move a submission by dragging its card to another
status column; the status changes instantly.

**House rule for the committee:** only change *Staða*, *Umsjón*,
*Athugasemdir*, *Samþykkt sem* and *Númer*, never what the submitter wrote.
If something is changed by mistake, the base has snapshots (kept for 1
month on the free plan). The expanded row should also show its change history.

## 7. Give the committee access

1. Each committee member creates a free SeaTable account (their own email).
2. Invite them to the team (max 25 users on the free plan), then add them to
   the group *Ráðstefnunefnd 2027*.
3. Group members get access to the group's bases. Check that a test member
   can edit. If you instead share the base with individual users: Share → **Sharing with users** → pick the
   person → **Read and write**.
4. People who only need to look (e.g. the rest of the board): **Read-only**.

## 8. Link it from the website

In the CMS (`/admin/`) → **Ráðstefnur** → **2027**:

- **Slóð fyrir innsendingu ágripa** = the form link from step 5.5.
- **Skilafrestur ágripa** = the same date as the form's submission deadline.

The conference page then shows the "Ágrip" card with a **Senda inn ágrip**
button. After the deadline the button turns into "Lokað hefur verið fyrir
innsendingu ágripa." on its own (daily rebuild). Link the form, don't embed it:
an embedded form would make the public page load content from SeaTable.

*Registration* can work the same way: a second table **Skráning** in the same
base, with its own form, linked from **Skráningarslóð** / **Skráningarfrestur**.

## 9. After the deadline

1. Review on the *Yfirferð* board. Every card ends in *Samþykkt* or *Hafnað*.
2. For accepted submissions, fill in **Samþykkt sem** and **Númer**.
3. Tell the authors. Send the emails yourself from efnis1@gmail.com; the *Samþykkt*
   view gives the addresses. (SeaTable automations could send emails
   automatically, but that needs setup and counts against the 100 runs a month.
   It isn't worth it for a few dozen abstracts.)
4. Programme: when times are set, enter the programme in the CMS
   (Ráðstefnur → 2027 → **Dagskrá**: time, code, title, speaker). Use the
   *Samþykkt* view as the source, or export it (CSV/XLSX) to work from.

## 10. Privacy and cleanup

- The form collects names, email addresses and affiliations. The consent
  checkbox in step 5.4 covers storing them and publishing accepted abstracts.
- Decide how long to keep the data, e.g. until the proceedings are published,
  then delete the rows or the whole base. Export the accepted abstracts first
  if the society wants an archive. TODO: board decision on retention.
- For the next conference: duplicate the base, delete all rows, rename the
  group and form, and set new deadlines.

## Things to check on first setup

These weren't confirmed by the documentation I read (2026-09-26):

- [ ] File uploads in the form work without a login, and what the size limit is (step 5.6).
- [ ] The Kanban view is available on the free plan (it's a standard view type; the price table doesn't list it).
- [ ] Menu names for inviting team members and administrators (step 1.3).
- [ ] Group members can edit the group's base (step 7.3), and rows show a change history (step 6).
- [ ] Whether the free plan can hide the "Powered by SeaTable" line on the form. It doesn't matter much.

## Sources

- Prices and plan limits: <https://seatable.com/prices/>
- Web forms: <https://seatable.com/help/webforms/>, <https://seatable.com/help/konfigurationsmoeglichkeiten-eines-webformulars/>
- Kanban view: <https://seatable.com/help/the-kanban-view/>
- Sharing: <https://seatable.com/help/share-base-with-users/>, <https://seatable.com/help/share-base-with-group-seatable/>
