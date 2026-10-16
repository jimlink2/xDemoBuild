var db = null;

function initDatabase(callback)
{
    var request = indexedDB.open("GoodtelDB_2", 1);

    request.onupgradeneeded = function(event)
    {
        var db = event.target.result;

        var store = db.createObjectStore(
            "plays",
            {
                keyPath: "id",
                autoIncrement: true
            }
        );

        store.createIndex(
            "playDate",
            "playDate",
            { unique: false }
        );
        
        store.createIndex(
            "playTime",
            "playTime",
            { unique: false }
        );

        store.createIndex(
            "visitorId",
            "visitorId",
            { unique: false }
        );

        store.createIndex(
            "playResult",
            "playResult",
            { unique: false }
        );

        store.createIndex(
            "storeId",
            "storeId",
            { unique: false }
        );
    };

    request.onsuccess = function(event)
    {
        db = event.target.result;

        console.log("Database initialized.");

        if (callback)
            callback();
    };

    request.onerror = function(event)
    {
        console.log("Database error:", event.target.error);
    };
}

function savePlay(playData, callback)
{
    if (!db)
    {
        alert("Database not initialized.");
        return;
    }

    var now = new Date();

    playData.playDate =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    playData.playTime =
        now.toTimeString().substring(0, 8);

    var transaction =
        db.transaction(["plays"], "readwrite");

    var store =
        transaction.objectStore("plays");

    var request =
        store.add(playData);

    request.onsuccess = function()
    {
        if (callback)
        {
            callback();
        }
    };

    request.onerror = function(event)
    {
        alert(
            "Save failed:",
            event.target.error
        );
    };
}

function getAllPlays(callback)
{
    var transaction =
        db.transaction(["plays"], "readonly");

    var store =
        transaction.objectStore("plays");

    var request =
        store.getAll();

    request.onsuccess = function()
    {
        callback(request.result);
    };

    request.onerror = function(event)
    {
        console.log(
            "Read failed:",
            event.target.error
        );
    };
}

function clearDatabase()
{
    if (!confirm(
        "Delete ALL play records?\n\nThis cannot be undone."
    ))
    {
        return;
    }
    
    var transaction =
        db.transaction(["plays"], "readwrite");

    var store =
        transaction.objectStore("plays");

    store.clear();

    transaction.oncomplete = function()
    {
        loadRecords();
    };
}
