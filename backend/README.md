# How to run the API

### Prerequisites

1. **.NET SDK**: Ensure you have .NET SDK installed. You can download it from [here](https://dotnet.microsoft.com/download).
2. **MySQL Server**: Ensure you have MySQL Server installed. You can download it from [here](https://dev.mysql.com/downloads/installer/).

### Step-by-Step Instructions

#### 1. Set the Environment Variable

You need to set the `DefaultConnection` environment variable to your MySQL connection string.

##### On Windows

Open Command Prompt and set the environment variable:

```cmd
setx DefaultConnection "Server=localhost;Database=finance;User=root;Password=yourpassword;"
```

##### On macOS/Linux

Open a terminal and set the environment variable:

```bash
export DefaultConnection="Server=localhost;Database=finance;User=root;Password=yourpassword;"
```

To set it permanently, you can add this line to your shell's configuration file (e.g., `~/.bashrc`, `~/.zshrc`).

#### 2. Create the MySQL Database

Before running the application, ensure the MySQL database exists.

1. Open MySQL Workbench or your preferred MySQL client.
2. Run the `init.sql` file to initialize the database

#### 3. Run the Application

#### 4. Verify the Application

Once the application is running, open your web browser and navigate to the Swagger UI to test the endpoints:

```
https://localhost:<port>/swagger/index.html
```

Replace `<port>` with the actual port number shown in your terminal output when you run the application.

#### 5. Test the Endpoints

You can test the endpoints using Swagger UI or tools like Postman.
