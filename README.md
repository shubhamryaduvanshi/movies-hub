# Start Project
- Clone the repository.
- Do npm install (do download the packages and dependencies).
- Do "ng serve" to run the project.

# Points Covered
## 1) Login page
 - Form Validation.
 - Style using SCSS.
 - Add Auth Guard.
 - Common Loader service.
 - Local storage used for storing the token
 - Display a toast for failure and success scenarios.

## 2) Home
### 2 (a) Header
 - Toggle Theme feature
 - Logout ( will remove local storage token and redirect to login)
 
 ### 2 (b) Body
  - OnInit fetches the movies from 
         "https://demo.credy.in/api/v1/maya/movies/".
  - For each movie card fetch the poster from "https://ui-avatars.com/".
  - If movies are not fetched then give the fetch button.
  - Can view the details of movie on click of view dwtails button.
  - Added Pagination at the bottom.
  - Search Feature (Needed optimization) 

