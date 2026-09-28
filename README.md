# WEB103 Project 2 - *Foster Paws*

Submitted by: **Linda Mukundwa**

About this web app: **It is a guide to fostering animals for the first timee**

Time spent: **3-4** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [X] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [X] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [X]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**


The following **optional** features are implemented:

- [ ] The user can search for items by a specific attribute

The following **additional** features are implemented:

- [X] Created Render Web Service to connect both site and DB. Please check it out with the link: https://foster-paws.onrender.com/ 

## Video Walkthrough

**Note: please be sure to 

Here's a walkthrough of implemented required features:

<img src='https://imgur.com/a/TimCOJL' title='Video Walkthrough' width='' alt='Video Walkthrough' />
Link (if broken in image) = https://imgur.com/a/TimCOJL 

<!-- Replace this with whatever GIF tool you used! -->
GIF created with screen recording + Imgur
Add GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

- I used SVGs throughout this project to get a warm and consistent theme across all pages. 
- The routing in this project reads window.location.hash and normalizes it to a path (#/guides/vet-visits -> guides/vet-visits. It matches against three patterns: empty → home, guides/:slug → detail, anything else → 404

## License

Copyright [2026] [Linda Mukundwa]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.