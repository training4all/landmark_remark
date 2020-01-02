### Installation
 - Must have Node and NPM installed on machine.
 - Clone repo from github (GITHUB_URL)
 - Must have VS 2017 or greater installed. For VS 2017, perform below steps
   ```sh
    - Open VS-2017
    - Tick checkbox ('use preview of the .NET Core SDK')
        - Under tools -> Options -> Projects and Solutions -> ASP.NET Core
    - Rebuild Project and it should work
    ```
- Intall node dependencies using 
    ```sh
    $ npm install
    ```
- Run App from Visual Studio IDE
     ```sh
    - It will run at (https://localhost:YOUR_PORT_NUMBER/)
    - Mine is running at (https://localhost:5001/)
    ```
    
### Tech Stack
- **[Angular8]** - To enhance web app.
- **[TypeScript]** - Type safety and easy development.
- **[Bootstrap]** - For creative and quick UI designs.
- **[XUnit, NSubstitude]** - To ensure integrity of app through unit tests.
- **[Rsjs Behaviorsubject pattern and Operators]** - To implement pub/sub pattern and easily data manipulation.
- **[NodeJS]** - Used to load dependencies.
- **[HttpInterceptor]** - To implement global http error handling and retry logic.
- **[Lodash]** - For easier and readable JS operations.
- **[HttpClient]** - For http calls and observables.
- **[Repository Pattern]** - Web Api for decoupling of data store.
- **[Entity Framework]** - ORM for App.
- **[Swagger]** - Web API testing and quick glance.
- **[Resharper]** - Code quality.
- **[Google Map API]** - Google Maps to draw and work with maps.

### Architecture
- Back End - REST WEB API
        -Controllers for **Users** and **Markers** are created.
       - Repository pattern is used which will make the database/store completly decoupled for the app.
       - Database can be generated either executing the script inside **Data/DBScripts/creationAndSeedScript.sql**
       - OR by invoking
    ```sh
    $ Update-Database
    ```
     -Database, **localdb** is used for data storage. Connection string is in appsettings.json
     -Code first approach is used to create Database by defining **Entities** and **Relationships**
     -Data Migrations are created under **Migrations** folder.
     -UserRepository and MarkerRepository extends Repository
     -**Swagger** middle ware is integrated for API testing and quick overview, can be accessed at
     ```sh
    https://localhost:YOUR_PORT_NUMER/swagger/index.html
    For Me,
    https://localhost:5001/swagger/index.html
    ```
![image](https://user-images.githubusercontent.com/17959609/71698225-df5c2800-2e0e-11ea-9062-288922fa037c.png)
- Front End - Angular App
        -   App is inside landmark-remark/ClientApp folder.
        -   Services
    - **[Auth-Guard]** - To authenticate the link before routing.
    - **[Authentication]** - To authenticate user.
    - **[Location]** - To keep track of current location.
    - **[Marker]** - To play with markers (creation, display, dragging etc)
    - **[User]** - To login or register users.
    - **[Logging-Message]** - To maintain and update login/register info/error message.
    
    -Components
    - **[Login]** - To authenticate user based on credentials.
    - **[Register]** - To Sign up new User.
    - **[Logging-Message]** - To display loggin info/errors.
    - **[Home]** - Container for map.
    - **[Notes-Map]** - Responsible for rendering maps and markers.
    - **[Nav-Menu]** - For navigation at top.
    - **[Add-Note]** - To add notes to map.
    - **[Map-Search]** - To filter notes on map by note content or user.


    
### How to use App
- Once you started the app, you will be routed to login page. I have created a default user with credentials as
        - **UserName: sa, Password: sa**
![image](https://user-images.githubusercontent.com/17959609/71695739-21816b80-2e07-11ea-91aa-dcfd4aa0a810.png)
- You can create new user using Register option, like below. Once new user is added successfully or not that will be notified by alert message at top.
![image](https://user-images.githubusercontent.com/17959609/71696541-63131600-2e09-11ea-9d2e-659a30be0f59.png)
![image](https://user-images.githubusercontent.com/17959609/71696607-89d14c80-2e09-11ea-9067-fc560b581ac5.png)
![image](https://user-images.githubusercontent.com/17959609/71696689-bab18180-2e09-11ea-9ff3-54fc6b7a7910.png)
- Once logged in, you will be landed to home page which displays map with
        - Two Default makers at Adelaide and Echucaa. This will be displayed as 'yellow' square pin which I customised to look like a Note.
        - Current location, its coming from browser. For browsers which does not support current location then Melbourne is the default location.
        - Logged in user name will be displayed next to logo 'Landmark Remark' in paranthesis like '(sa)'.
        - Now you can see 'Logout' navigation to logout and login as different user.
![image](https://user-images.githubusercontent.com/17959609/71696880-59d67900-2e0a-11ea-8a92-67d595df086a.png)
- To add a new marker you can simply drag current location marker to new location, once drag is completed. You can single click current location marker to add new note at that location. Description is limited to 50 characters only and multi lines are support while adding description. There are 2 buttons 'Save' and 'Discard' which you can use to either save the note or discrad the note. Once, new note is saved then a new marker as 'Note' will be displayed at same location.
![image](https://user-images.githubusercontent.com/17959609/71697027-c81b3b80-2e0a-11ea-8554-e3e1dcb7cd19.png)
![image](https://user-images.githubusercontent.com/17959609/71697131-247e5b00-2e0b-11ea-829f-8850340b8080.png)
In this example, I have added a new note for user 'sa'. Now, lets say I log out and login as user 'John' then I will see this  new note added by user 'sa'. In addition to 3 existing markers, I will create 2 new markers for user 'John'
![image](https://user-images.githubusercontent.com/17959609/71697335-c9009d00-2e0b-11ea-87a1-8b4a329e41f4.png)
![image](https://user-images.githubusercontent.com/17959609/71697473-33b1d880-2e0c-11ea-95cb-0e8c09daa82f.png)
2 new Markers at 'Mount Gambier' and 'Balarat' are created by User. If you hover to any marker then in tooltip you can see the user who has created the marker.
![image](https://user-images.githubusercontent.com/17959609/71697550-74a9ed00-2e0c-11ea-9a9e-cd4796c23bd4.png)
![image](https://user-images.githubusercontent.com/17959609/71697592-9905c980-2e0c-11ea-9b8d-be8aa372198b.png)
- Content of existing marker can be displayed by single click on that marker. In title, user is diaplyed and then description. Note window can be closed by clicking on close icon at top right corner.
![image](https://user-images.githubusercontent.com/17959609/71697651-cb172b80-2e0c-11ea-8923-c4fca7325abe.png)
- Search functionality is implemented so that notes can be searched either by user who created notes or by content of the notes. New custom search control is added at the top centre of map which has an input box which accepts the text that needs to be searched, 2 radio buttons to select the search creteria, 'search' button to instantiate the search and 'clear' button to clear the content of the input box. Lets say I want to display notes created by user 'sa' and not by user 'john' then the accepted result would be to have only 3 notes at (Adelaide, Echucca and National Park)
![image](https://user-images.githubusercontent.com/17959609/71697877-7fb14d00-2e0d-11ea-9f22-26f19da75fb7.png)
Likewise, for john there would be only 2 markers (Mount Gambier and Balarat)
![image](https://user-images.githubusercontent.com/17959609/71697944-a5d6ed00-2e0d-11ea-91be-7d03dbbb259f.png)
- Search can also be done on description of notes, lets say we search for note having 'Park' in it then we would be excepted to see only note created by john at national park. I have selected 'notes-text' from radio buttons.
![image](https://user-images.githubusercontent.com/17959609/71697994-e46ca780-2e0d-11ea-8331-f42dc0a1d2ad.png)
- If I discard current search then all available notes will be displayed.
![image](https://user-images.githubusercontent.com/17959609/71698057-24cc2580-2e0e-11ea-8b20-fc0b2d37c999.png)

**Thanks, Enjoy Landmark Remark App**
    
