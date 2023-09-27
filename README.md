# SkillsSwap

SkillsSwap is a fullstack web application. It is a clone of the website fiveer. You can create your very own freelance listing and hve others review your listing as well as making requests

Live Site [SkillsSwap](https://skillswap-pky9.onrender.com/)

## Index

[MVP Feature List](https://github.com/Oscar-999/SkillsSwap/wiki/Features-List) |
[Database Scheme](https://github.com/Oscar-999/SkillsSwap/wiki/Db-Diagram) |
[User Stories](https://github.com/Oscar-999/SkillsSwap/wiki/User-Stories) |
[Routes]() |

## Tech Used
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Code I'm Proud Of

```javascript
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <DarkMode/>
      {isLoaded && (
        <Switch>
          <Route  exact path="/" component={LandingPage}/>
          <Route path="/login" component={LoginFormPage}/>
          <Route path="/signup" component={SignupFormPage}/>
          <ProtectedRoute exact path="/skills" component={Explore}/>
          <ProtectedRoute exact path="/skills/:skillId" component={SingleSkill}/>
          <ProtectedRoute exact path="/account" component={AccountPage} />
          {/* <ProtectedRoute exact path="/requests" component={ExploreRequest}/> */}
          <Route path="*" component={ErrorPage}/>
        </Switch>
      )}
    </>
  );
}

export default App;
```
Explanation :


This code sets up the basic structure of a web application, including authentication, navigation, and routing. The DarkMode component is included throughout the application to potentially provide a dark mode feature, since the DarkMode component is nested higher this allws the user to switch between modes seemlessly

## Getting started

1. Clone this repository: https://github.com/Oscar-999/SkillsSwap.git
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:
   * backend (In base of directory):
       * ` Pipenv install `
   * frontend :
       * ` npm install `
3. Create a .env file using the .envexample provided

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed (base directory):
   * ` Pipenv shell `
   * ` flask db init `
   * ` flask db migrate `
   * ` flask db upgrade `
   * ` flask seed all `
5. Start the app for both backend and frontend using:
   * backend :
       * ` pipenv run flask run `
   * frontend :
       * ` npm start `
## Amazon Web Services S3
   * For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

## Landing Page
![landing-page-gif]()

## Skills Page
![skill-page-gif]()

# Features 

## Spots
* Users can create a Spot
* Users can read/view other Spot
* Users can update their Spot
* Users can delete their Spot

## Reviews
* Users can create Reviews on Spots
* users can read/view all of the Reviews on a Spot
* Users can delete their Review(s) on a Spot

## Bookings
Logged-in Users can
* Create a booking at a spot
* Update their booking at a spot
* Read all of their bookings
* Delete/Cancel their booking


## Contact
Contact Me[LinkedIn](https://www.linkedin.com/in/oscaralcantar/)
