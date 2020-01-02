IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Users] (
    [UserName] nvarchar(20) NOT NULL,
    [Id] int NOT NULL IDENTITY,
    [Password] nvarchar(10) NOT NULL,
    [FirstName] nvarchar(20) NOT NULL,
    [LastName] nvarchar(20) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([UserName])
);

GO

CREATE TABLE [Markers] (
    [Id] int NOT NULL IDENTITY,
    [UserName] nvarchar(20) NULL,
    [Latitude] float NOT NULL,
    [Longitude] float NOT NULL,
    [Description] nvarchar(50) NOT NULL,
    CONSTRAINT [PK_Markers_Id] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Markers_Users_UserName] FOREIGN KEY ([UserName]) REFERENCES [Users] ([UserName]) ON DELETE NO ACTION
);

GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'UserName', N'FirstName', N'LastName', N'Password') AND [object_id] = OBJECT_ID(N'[Users]'))
    SET IDENTITY_INSERT [Users] ON;
INSERT INTO [Users] ([UserName], [FirstName], [LastName], [Password])
VALUES (N'sa', N'admin', N'admin', N'sa');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'UserName', N'FirstName', N'LastName', N'Password') AND [object_id] = OBJECT_ID(N'[Users]'))
    SET IDENTITY_INSERT [Users] OFF;

GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Description', N'Latitude', N'Longitude', N'UserName') AND [object_id] = OBJECT_ID(N'[Markers]'))
    SET IDENTITY_INSERT [Markers] ON;
INSERT INTO [Markers] ([Id], [Description], [Latitude], [Longitude], [UserName])
VALUES (1, N'Welcome to Melbourne!!!', 144.968853E0, -37.801504000000001E0, N'sa');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Description', N'Latitude', N'Longitude', N'UserName') AND [object_id] = OBJECT_ID(N'[Markers]'))
    SET IDENTITY_INSERT [Markers] OFF;

GO

CREATE INDEX [IX_Markers_UserName] ON [Markers] ([UserName]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191220054750_DbCreationAndSeeding', N'3.1.0');

GO

UPDATE [Markers] SET [Description] = N'Welcome to Adelaide !!!', [Latitude] = -34.890127999999997E0, [Longitude] = 138.601519E0
WHERE [Id] = 1;
SELECT @@ROWCOUNT;


GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Description', N'Latitude', N'Longitude', N'UserName') AND [object_id] = OBJECT_ID(N'[Markers]'))
    SET IDENTITY_INSERT [Markers] ON;
INSERT INTO [Markers] ([Id], [Description], [Latitude], [Longitude], [UserName])
VALUES (2, N'Welcome to Echucca !!!', -36.146321E0, 144.74462500000001E0, N'sa');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Description', N'Latitude', N'Longitude', N'UserName') AND [object_id] = OBJECT_ID(N'[Markers]'))
    SET IDENTITY_INSERT [Markers] OFF;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191227052220_DbDataUpdate', N'3.1.0');

GO

