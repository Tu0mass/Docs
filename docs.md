# Growtopia Lua Documentation (Complete Compact)

## Functions Reference

### Packet/Network Functions
| Function | Signature | Description & Usage Notes |
| :--- | :--- | :--- |
| **SendPacket** | `SendPacket(int type, string packet)` | Sends a text packet with the selected type to the server. (e.g., `SendPacket(2, "action|respawn")`) |
| **SendPacketRaw** | `SendPacketRaw(GamePacket packet)` | Sends a raw `GamePacket` struct to the server. |
| **SendPacketRawClient** | `SendPacketRawClient(GamePacket packet)` | Sends a raw `GamePacket` struct to the client. |
| **SendVarlist** | `SendVarlist(table varlist)` | Sends a VariantList (table) to the server. **Requires `var.netid` to be set.** |
| **SendWebhook** | `SendWebhook(string webhook, string json)` | Sends a JSON payload to a Discord webhook URL. |
| **GetPing** | `GetPing()` | Returns your current ping in milliseconds. |

### World/Tile/Object Functions
| Function | Signature | Description & Usage Notes |
| :--- | :--- | :--- |
| **GetTile** | `GetTile(int x, int y)` | Returns the world `Tile` struct at the selected position. |
| **GetTiles** | `GetTiles()` | Returns a table of all `Tile` structs in the current world. |
| **GetObjects** | `GetObjects()` | Returns a table of all `WorldObject` structs (dropped items, etc.) in the world. |
| **IsSolid** | `IsSolid(int x, int y)` | Checks if the tile at (x, y) is solid. Returns boolean. |
| **GetAccesslist** | `GetAccesslist(int x, int y)` | Gets the lock's access user ID list at (x, y). |
| **GetGhost** | `GetGhost()` | Gets all ghost NPC data (id, pos_x, pos_y). |

### Player/Inventory/Item Info Functions
| Function | Signature | Description & Usage Notes |
| :--- | :--- | :--- |
| **GetLocal** | `GetLocal()` | Returns the local `NetAvatar` struct. Allows read/write access (e.g., changing player name). |
| **GetPlayers** | `GetPlayers()` | Returns a table of all `NetAvatar` structs in the world. |
| **GetInventory** | `GetInventory()` | Returns a table of `InventoryItem` structs. |
| **GetItemCount** | `GetItemCount(int id)` | Returns the count of an item in the inventory by its ID. |
| **GetIteminfo** | `GetIteminfo(int id)` | Returns the `ItemInfo` struct for the given item ID. |

### Pathfinding Functions
| Function | Signature | Description & Usage Notes |
| :--- | :--- | :--- |
| **FindPath** | `FindPath(int x, int y)` | Initiates movement/pathfinding to the selected (x, y) coordinates. |
| **CheckPath** | `CheckPath(int x, int y)` | Checks if a path can be found to (x, y). Returns boolean (`true` if path found). |
| **PathFind** | `PathFind(int x, int y)` | Returns a table of path coordinates (`{x, y}`) to the destination. |

### Script/Thread/Utility Functions
| Function | Signature | Description & Usage Notes |
| :--- | :--- | :--- |
| **log** | `log(string message)` | Logs a message to the Growtopia console (client-side only). |
| **RunThread** | `RunThread(function)` | Runs a function in a separate thread. |
| **Sleep** | `Sleep(int ms)` | Pauses the current thread for the specified milliseconds. Must be run within a thread. |
| **MessageBox** | `MessageBox(string title, string content)` | Displays a client-side message box popup. |
| **EditToggle** | `EditToggle(string module, bool toggle)` | Toggles the state of an internal module. |

---

### Callback and Timer Functions
| Function | Signature | Description & Usage Notes |
| :--- | :--- | :--- |
| **AddCallback** | `AddCallback(string name, string type, void* function)` | Adds a named hook to a specific event type (e.g., "OnVarlist", "OnPacket", "OnUpdate", "OnTouch"). |
| **RemoveCallbacks** | `RemoveCallbacks()` | Removes all registered callbacks. |
| **RemoveCallback** | `RemoveCallback(string name)` | Removes a specific callback by name. |
| **Timer** | *(Library)* | A GMod-style timer library (`timer.Create("name", delay, repeat, func)`). Requires `AddCallback("timer", "OnUpdate", ...)` to function. |

---

### EditToggle Module List
The following strings can be used for the `module` argument in `EditToggle(module, toggle)`:
* `MenuToggle`
* `Execute Luascript`
* `Stop Luascript`
* `Antiportal`
* `ModFly`
* `Autocollect`
* `Antibounce`

---
## Structs Reference

### NetAvatar (Player Data)
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Player's name. |
| `world` | String | Player's world (local only). |
| `country` | String | Player's flag ID. |
| `pos_x`, `pos_y` | Number | Player's world position. |
| `tile_x`, `tile_y` | Number | Player's tile position. |
| `netid` | Number | Player's netID. |
| `userid` | Number | Player's userID. |
| `gems` | Number | Player's current gems. |
| `facing_left` | Bool | Is player facing left. |
| `flags`, `flags2` | Number | State flags. |

### WorldObject (Dropped Items/Collectables)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Number | Object's item ID. |
| `oid` | Number | Object's index. |
| `pos_x`, `pos_y` | Number | Object's position. |
| `count` | Number | Item count. |
| `flags` | Number | Object's flags. |

### InventoryItem
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Number | Item's ID. |
| `count` | Number | Item count. |

### Tile (Block Data)
| Field | Type | Description |
| :--- | :--- | :--- |
| `fg` | Number | Foreground block's ID. |
| `bg` | Number | Background block's ID. |
| `pos_x`, `pos_y` | Number | Tile's position. |
| `flags` | Number | Tile's flags. |
| `water`, `fire` | Bool | Tile state indicators. |
| `ready` | Bool | Ready to harvest indicator. |

### GamePacket (Raw Packet Data)
| Field | Type | Description |
| :--- | :--- | :--- |
| `type` | Number | Packet type. |
| `netid` | Number | Packet netID. |
| `flags` | Number | Packet flags. |
| `int_data` | Number | General integer data field. |
| `pos_x`, `pos_y`, etc. | Number | Various internal data fields. |

### VariantList (RPC/Text Packet Equivalent)
| Field | Type | Description |
| :--- | :--- | :--- |
| `netid` | Number | NetID of the sending entity. |
| `delay` | Number | Send delay. |
| `[0]` | String | Variant function name (e.g., "OnConsoleMessage"). |
| `[1]` to `[5]` | Any | Parameters 1 through 5. |

### ItemInfo (Global Item Data)
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Item's name. |
| `item_type` | Number | Item's type. |
| `growth` | Number | Item's growth time. |
| `rarity` | Number | Item's rarity level. |
| `size` | Number | Item's list size. |
