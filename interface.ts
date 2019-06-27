type CommandKey = string | Buffer | number;
type CommandPattern = string | Buffer;

interface Commander {
  /**
   * Append a value to a key.
   *
   * Complexity: O(1). The amortized time complexity is O(1) assuming the appended value is small and the already present value is of any size, since the dynamic string library used by Redis will double the free space available on every reallocation.
   *
   * Since Redis v2.0.0
   *
   * @returns the length of the string after the append operation
   *
   */
  append(key: CommandKey, value: string | Buffer): Promise<number>;
  asking(...args: any[]): Promise<any>;
  /**
   * Authenticate to the server.
   *
   * Since Redis v1.0.0
   *
   */
  auth(password: string | Buffer): Promise<"OK">;
  /**
   * Asynchronously rewrite the append-only file.
   *
   * Since Redis v1.0.0
   *
   */
  bgrewriteaof(): Promise<"OK">;
  /**
   * Asynchronously save the dataset to disk.
   *
   * Since Redis v1.0.0
   *
   */
  bgsave(): Promise<"OK">;
  /**
   * Count set bits in a string.
   *
   * Complexity: O(N)
   *
   * Since Redis v2.6.0
   *
   * @returns The number of bits set to 1
   *
   */
  bitcount(key: CommandKey): Promise<number>;

  bitcount(key: CommandKey, start: number, end: number): Promise<number>;
  /**
   * Perform bitwise operations between strings.
   *
   * Complexity: O(N)
   *
   * Since Redis v2.6.0
   *
   * @returns The size of the string stored in the destination key, that is equal to the size of the longest input string.
   *
   */
  bitop(
    operation: string | Buffer,
    destkey: CommandKey,
    ...keys: CommandKey[]
  ): Promise<number>;
  /**
   * Find first bit set or clear in a string.
   *
   * Complexity: O(N)
   *
   * Since Redis v2.8.7
   *
   * @returns The command returns the position of the first bit set to 1 or 0 according to the request.
   *
   */
  bitpos(key: CommandKey, bit: number): Promise<number>;

  bitpos(key: CommandKey, bit: number, start: number): Promise<number>;

  bitpos(key: CommandKey, bit: number, end: number): Promise<number>;

  bitpos(
    key: CommandKey,
    bit: number,
    start: number,
    end: number
  ): Promise<number>;
  /**
   * Pop a value from a list, push it to another list and return it; or block until one is available.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   * @returns The element being popped from source and pushed to destination. If timeout is reached, a Null reply is returned.
   *
   */
  brpoplpush(
    source: CommandKey,
    destination: CommandKey,
    timeout: number
  ): Promise<string>;
  /**
   * Pop a value from a list, push it to another list and return it; or block until one is available.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   * @returns The element being popped from source and pushed to destination. If timeout is reached, a Null reply is returned.
   *
   */
  brpoplpushBuffer(
    source: CommandKey,
    destination: CommandKey,
    timeout: number
  ): Promise<Buffer>;
  /**
   * Get the current connection name.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.9
   *
   * @returns The connection name, or null if no name is set.
   *
   */
  client(getname: "getname"): Promise<string>;
  /**
   * Get the current connection name.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.9
   *
   * @returns The connection name, or null if no name is set.
   *
   */
  clientBuffer(getname: "getname"): Promise<Buffer>;
  /**
   * Returns the client ID for the current connection.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   * @returns the ID of the current connection
   *
   */
  client(id: "id"): Promise<number>;
  /**
   * Kill the connection of a client.
   *
   * Complexity: O(N) where N is the number of client connections.
   *
   * Since Redis v2.4.0
   *
   * @returns the number of clients killed
   *
   */
  client(kill: "kill", ipPort: string | Buffer): Promise<"OK" | number>;

  client(kill: "kill"): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    idOption: "id" | "ID",
    idKey: number
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    idOption: "id" | "ID",
    idKey: number
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub"
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub"
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    idOption: "id" | "ID",
    idKey: number,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub"
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    idOption: "id" | "ID",
    idKey: number,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub"
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    idOption: "id" | "ID",
    idKey: number,
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    idOption: "id" | "ID",
    idKey: number,
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    idOption: "id" | "ID",
    idKey: number,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    idOption: "id" | "ID",
    idKey: number,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    idOption: "id" | "ID",
    idKey: number,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    idOption: "id" | "ID",
    idKey: number,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    idOption: "id" | "ID",
    idKey: number,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    idOption: "id" | "ID",
    idKey: number,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    idOption: "id" | "ID",
    idKey: number,
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    idOption: "id" | "ID",
    idKey: number,
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    ipPort: string | Buffer,
    idOption: "id" | "ID",
    idKey: number,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;

  client(
    kill: "kill",
    idOption: "id" | "ID",
    idKey: number,
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "slave" | "pubsub",
    addrOption: "addr" | "ADDR",
    addrKey: string | Buffer,
    skipmeOption: "skipme" | "SKIPME",
    skipmeKey: string | Buffer
  ): Promise<"OK" | number>;
  /**
   * Get the list of client connections.
   *
   * Complexity: O(N) where N is the number of client connections.
   *
   * Since Redis v2.4.0
   *
   * @returns One client connection per line (separated by LF). Each line is composed of a succession of property=value fields separated by a space character.
   *
   */
  client(
    list: "list",
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "replica" | "pubsub"
  ): Promise<string>;

  client(list: "list"): Promise<string>;
  /**
   * Get the list of client connections.
   *
   * Complexity: O(N) where N is the number of client connections.
   *
   * Since Redis v2.4.0
   *
   * @returns One client connection per line (separated by LF). Each line is composed of a succession of property=value fields separated by a space character.
   *
   */
  clientBuffer(
    list: "list",
    typeOption: "type" | "TYPE",
    typeKey: "normal" | "master" | "replica" | "pubsub"
  ): Promise<Buffer>;

  clientBuffer(list: "list"): Promise<Buffer>;
  /**
   * Stop processing commands from clients for some time.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.9.50
   *
   * @returns The command returns OK or an error if the timeout is invalid.
   *
   */
  client(pause: "pause", timeout: number): Promise<"OK">;
  /**
   * Instruct the server whether to reply to commands.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2
   *
   */
  client(reply: "reply", replyMode: "ON" | "OFF" | "SKIP"): Promise<any>;
  /**
   * Set the current connection name.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.9
   *
   * @returns Will return OK if the connection name was successfully set.
   *
   */
  client(setname: "setname", connectionName: string | Buffer): Promise<"OK">;
  /**
   * Unblock a client blocked in a blocking command from a different connection.
   *
   * Complexity: O(log N) where N is the number of client connections.
   *
   * Since Redis v5.0.0
   *
   */
  client(unblock: "unblock", clientId: string | Buffer): Promise<any>;

  client(
    unblock: "unblock",
    clientId: string | Buffer,
    unblockType: "TIMEOUT" | "ERROR"
  ): Promise<any>;
  /**
   * Assign new hash slots to receiving node.
   *
   * Complexity: O(N) where N is the total number of hash slot arguments.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(addslots: "addslots", ...slots: number[]): Promise<any>;
  /**
   * Return the number of failure reports active for a given node.
   *
   * Complexity: O(N) where N is the number of failure reports.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    countFailureReports: "count-failure-reports",
    nodeId: string | Buffer
  ): Promise<any>;
  /**
   * Return the number of local keys in the specified hash slot.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(countkeysinslot: "countkeysinslot", slot: number): Promise<any>;
  /**
   * Set hash slots as unbound in receiving node.
   *
   * Complexity: O(N) where N is the total number of hash slot arguments.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(delslots: "delslots", ...slots: number[]): Promise<any>;
  /**
   * Forces a replica to perform a manual failover of its master.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(failover: "failover", options: "FORCE" | "TAKEOVER"): Promise<any>;

  cluster(failover: "failover"): Promise<any>;
  /**
   * Remove a node from the nodes table.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(forget: "forget", nodeId: string | Buffer): Promise<any>;
  /**
   * Return local key names in the specified hash slot.
   *
   * Complexity: O(log(N)) where N is the number of requested keys.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    getkeysinslot: "getkeysinslot",
    slot: number,
    count: number
  ): Promise<any>;
  /**
   * Provides info about Redis Cluster node state.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(info: "info"): Promise<any>;
  /**
   * Returns the hash slot of the specified key.
   *
   * Complexity: O(N) where N is the number of bytes in the key.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(keyslot: "keyslot", key: string | Buffer): Promise<any>;
  /**
   * Force a node cluster to handshake with another node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(meet: "meet", ip: string | Buffer, port: number): Promise<any>;
  /**
   * Get Cluster config for the node.
   *
   * Complexity: O(N) where N is the total number of Cluster nodes.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(nodes: "nodes"): Promise<any>;
  /**
   * List replica nodes of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   */
  cluster(replicas: "replicas", nodeId: string | Buffer): Promise<any>;
  /**
   * Reconfigure a node as a replica of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(replicate: "replicate", nodeId: string | Buffer): Promise<any>;
  /**
   * Reset a Redis Cluster node.
   *
   * Complexity: O(N) where N is the number of known nodes. The command may execute a FLUSHALL as a side effect.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(reset: "reset", resetType: "HARD" | "SOFT"): Promise<any>;

  cluster(reset: "reset"): Promise<any>;
  /**
   * Forces the node to save cluster state on disk.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(saveconfig: "saveconfig"): Promise<any>;
  /**
   * Set the configuration epoch in a new node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    setConfigEpoch: "set-config-epoch",
    configEpoch: number
  ): Promise<any>;
  /**
   * Bind a hash slot to a specific node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    setslot: "setslot",
    slot: number,
    subcommand: "IMPORTING" | "MIGRATING" | "STABLE" | "NODE"
  ): Promise<any>;

  cluster(
    setslot: "setslot",
    slot: number,
    subcommand: "IMPORTING" | "MIGRATING" | "STABLE" | "NODE",
    nodeId: string | Buffer
  ): Promise<any>;
  /**
   * List replica nodes of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(slaves: "slaves", nodeId: string | Buffer): Promise<any>;
  /**
   * Get array of Cluster slot to node mappings.
   *
   * Complexity: O(N) where N is the total number of Cluster nodes.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(slots: "slots"): Promise<any>;
  /**
   * Get array of Redis command details.
   *
   * Complexity: O(N) where N is the total number of Redis commands.
   *
   * Since Redis v2.8.13
   *
   */
  command(): Promise<any>;
  /**
   * Get total number of Redis commands.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.8.13
   *
   */
  command(count: "count"): Promise<any>;
  /**
   * Extract keys given a full Redis command.
   *
   * Complexity: O(N) where N is the number of arguments to the command.
   *
   * Since Redis v2.8.13
   *
   */
  command(getkeys: "getkeys"): Promise<any>;
  /**
   * Get array of specific Redis command details.
   *
   * Complexity: O(N) when N is number of commands to look up.
   *
   * Since Redis v2.8.13
   *
   */
  command(info: "info", ...commandNames: (string | Buffer)[]): Promise<any>;
  /**
   * Get the value of a configuration parameter.
   *
   * Since Redis v2.0.0
   *
   */
  config(get: "get", parameter: string | Buffer): Promise<any>;
  /**
   * Reset the stats returned by INFO.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  config(resetstat: "resetstat"): Promise<any>;
  /**
   * Rewrite the configuration file with the in memory configuration.
   *
   * Since Redis v2.8.0
   *
   */
  config(rewrite: "rewrite"): Promise<any>;
  /**
   * Set a configuration parameter to the given value.
   *
   * Since Redis v2.0.0
   *
   */
  config(
    set: "set",
    parameter: string | Buffer,
    value: string | Buffer
  ): Promise<any>;
  /**
   * Return the number of keys in the selected database.
   *
   * Since Redis v1.0.0
   *
   */
  dbsize(): Promise<any>;
  /**
   * Get debugging information about a key.
   *
   * Since Redis v1.0.0
   *
   */
  debug(object: "object", key: CommandKey): Promise<any>;
  /**
   * Make the server crash.
   *
   * Since Redis v1.0.0
   *
   */
  debug(segfault: "segfault"): Promise<any>;
  /**
   * Decrement the integer value of a key by one.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  decr(key: CommandKey): Promise<any>;
  /**
   * Decrement the integer value of a key by the given number.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  decrby(key: CommandKey, decrement: number): Promise<any>;
  /**
   * Delete a key.
   *
   * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
   *
   * Since Redis v1.0.0
   *
   */
  del(...keys: CommandKey[]): Promise<any>;
  /**
   * Discard all commands issued after MULTI.
   *
   * Since Redis v2.0.0
   *
   */
  discard(): Promise<any>;
  /**
   * Return a serialized version of the value stored at the specified key.
   *
   * Complexity: O(1) to access the key and additional O(N*M) to serialized it, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1).
   *
   * Since Redis v2.6.0
   *
   */
  dump(key: CommandKey): Promise<any>;
  /**
   * Echo the given string.
   *
   * Since Redis v1.0.0
   *
   */
  echo(message: string | Buffer): Promise<any>;
  /**
   * Execute all commands issued after MULTI.
   *
   * Since Redis v1.2.0
   *
   */
  exec(): Promise<any>;
  /**
   * Determine if a key exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  exists(...keys: CommandKey[]): Promise<any>;
  /**
   * Set a key's time to live in seconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  expire(key: CommandKey, seconds: number): Promise<any>;
  /**
   * Remove all keys from all databases.
   *
   * Since Redis v1.0.0
   *
   */
  flushall(async: "ASYNC"): Promise<any>;

  flushall(): Promise<any>;
  /**
   * Remove all keys from the current database.
   *
   * Since Redis v1.0.0
   *
   */
  flushdb(async: "ASYNC"): Promise<any>;

  flushdb(): Promise<any>;
  /**
   * Returns the distance between two members of a geospatial index.
   *
   * Complexity: O(log(N))
   *
   * Since Redis v3.2.0
   *
   */
  geodist(
    key: CommandKey,
    member1: string | Buffer,
    member2: string | Buffer
  ): Promise<any>;

  geodist(
    key: CommandKey,
    member1: string | Buffer,
    member2: string | Buffer,
    unit: string | Buffer
  ): Promise<any>;
  /**
   * Returns members of a geospatial index as standard geohash strings.
   *
   * Complexity: O(log(N)) for each member requested, where N is the number of elements in the sorted set.
   *
   * Since Redis v3.2.0
   *
   */
  geohash(key: CommandKey, ...members: (string | Buffer)[]): Promise<any>;
  /**
   * Returns longitude and latitude of members of a geospatial index.
   *
   * Complexity: O(log(N)) for each member requested, where N is the number of elements in the sorted set.
   *
   * Since Redis v3.2.0
   *
   */
  geopos(key: CommandKey, ...members: (string | Buffer)[]): Promise<any>;
  /**
   * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point.
   *
   * Complexity: O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index.
   *
   * Since Redis v3.2.0
   *
   */
  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadius(
    key: CommandKey,
    longitude: number,
    latitude: number,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;
  georadiusRo(...args: any[]): Promise<any>;
  /**
   * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member.
   *
   * Complexity: O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index.
   *
   * Since Redis v3.2.0
   *
   */
  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC"
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;

  georadiusbymember(
    key: CommandKey,
    member: string | Buffer,
    radius: number,
    unit: "m" | "km" | "ft" | "mi",
    withcoord: "WITHCOORD",
    withdist: "WITHDIST",
    withhash: "WITHHASH",
    countOption: "count" | "COUNT",
    count: number,
    order: "ASC" | "DESC",
    storeOption: "store" | "STORE",
    storeKey: CommandKey,
    storedistOption: "storedist" | "STOREDIST",
    storedistKey: CommandKey
  ): Promise<any>;
  georadiusbymemberRo(...args: any[]): Promise<any>;
  /**
   * Get the value of a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   * @returns the value of key, or null when key does not exist.
   *
   */
  get(key: CommandKey): Promise<string>;
  /**
   * Get the value of a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   * @returns the value of key, or null when key does not exist.
   *
   */
  getBuffer(key: CommandKey): Promise<Buffer>;
  /**
   * Returns the bit value at offset in the string value stored at key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   * @returns The bit value stored at offset
   *
   */
  getbit(key: CommandKey, offset: number): Promise<number>;
  /**
   * Get a substring of the string stored at a key.
   *
   * Complexity: O(N) where N is the length of the returned string. The complexity is ultimately determined by the returned length, but because creating a substring from an existing string is very cheap, it can be considered O(1) for small strings.
   *
   * Since Redis v2.4.0
   *
   */
  getrange(key: CommandKey, start: number, end: number): Promise<any>;
  /**
   * Set the string value of a key and return its old value.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  getset(key: CommandKey, value: string | Buffer): Promise<any>;
  /**
   * Delete one or more hash fields.
   *
   * Complexity: O(N) where N is the number of fields to be removed.
   *
   * Since Redis v2.0.0
   *
   */
  hdel(key: CommandKey, ...fields: (string | Buffer)[]): Promise<any>;
  /**
   * Determine if a hash field exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hexists(key: CommandKey, field: string | Buffer): Promise<any>;
  /**
   * Get the value of a hash field.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hget(key: CommandKey, field: string | Buffer): Promise<any>;
  /**
   * Get all the fields and values in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hgetall(key: CommandKey): Promise<any>;
  /**
   * Increment the integer value of a hash field by the given number.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hincrby(
    key: CommandKey,
    field: string | Buffer,
    increment: number
  ): Promise<any>;
  /**
   * Increment the float value of a hash field by the given amount.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  hincrbyfloat(
    key: CommandKey,
    field: string | Buffer,
    increment: number
  ): Promise<any>;
  /**
   * Get all the fields in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hkeys(key: CommandKey): Promise<any>;
  /**
   * Get the number of fields in a hash.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hlen(key: CommandKey): Promise<any>;
  /**
   * Get the values of all the given hash fields.
   *
   * Complexity: O(N) where N is the number of fields being requested.
   *
   * Since Redis v2.0.0
   *
   */
  hmget(key: CommandKey, ...fields: (string | Buffer)[]): Promise<any>;
  host(...args: any[]): Promise<any>;
  /**
   * Incrementally iterate hash fields and associated values.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..
   *
   * Since Redis v2.8.0
   *
   */
  hscan(key: CommandKey, cursor: number): Promise<any>;

  hscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern
  ): Promise<any>;

  hscan(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  hscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;
  /**
   * Set the string value of a hash field.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hset(
    key: CommandKey,
    field: string | Buffer,
    value: string | Buffer
  ): Promise<any>;
  /**
   * Set the value of a hash field, only if the field does not exist.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hsetnx(
    key: CommandKey,
    field: string | Buffer,
    value: string | Buffer
  ): Promise<any>;
  /**
   * Get the length of the value of a hash field.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2.0
   *
   */
  hstrlen(key: CommandKey, field: string | Buffer): Promise<any>;
  /**
   * Get all the values in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hvals(key: CommandKey): Promise<any>;
  /**
   * Increment the integer value of a key by one.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  incr(key: CommandKey): Promise<any>;
  /**
   * Increment the integer value of a key by the given amount.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  incrby(key: CommandKey, increment: number): Promise<any>;
  /**
   * Increment the float value of a key by the given amount.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  incrbyfloat(key: CommandKey, increment: number): Promise<any>;
  /**
   * Get information and statistics about the server.
   *
   * Since Redis v1.0.0
   *
   */
  info(section: string | Buffer): Promise<any>;

  info(): Promise<any>;
  /**
   * Find all keys matching the given pattern.
   *
   * Complexity: O(N) with N being the number of keys in the database, under the assumption that the key names in the database and the given pattern have limited length.
   *
   * Since Redis v1.0.0
   *
   */
  keys(pattern: CommandPattern): Promise<any>;
  /**
   * Get the UNIX time stamp of the last successful save to disk.
   *
   * Since Redis v1.0.0
   *
   */
  lastsave(): Promise<any>;
  latency(...args: any[]): Promise<any>;
  /**
   * Get an element from a list by its index.
   *
   * Complexity: O(N) where N is the number of elements to traverse to get to the element at index. This makes asking for the first or the last element of the list O(1).
   *
   * Since Redis v1.0.0
   *
   */
  lindex(key: CommandKey, index: number): Promise<any>;
  /**
   * Insert an element before or after another element in a list.
   *
   * Complexity: O(N) where N is the number of elements to traverse before seeing the value pivot. This means that inserting somewhere on the left end on the list (head) can be considered O(1) and inserting somewhere on the right end (tail) is O(N).
   *
   * Since Redis v2.2.0
   *
   */
  linsert(
    key: CommandKey,
    where: "BEFORE" | "AFTER",
    pivot: string | Buffer,
    value: string | Buffer
  ): Promise<any>;
  /**
   * Get the length of a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  llen(key: CommandKey): Promise<any>;
  lolwut(...args: any[]): Promise<any>;
  /**
   * Remove and get the first element in a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  lpop(key: CommandKey): Promise<any>;
  /**
   * Prepend one or multiple values to a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   * @returns the length of the list after the push operations
   *
   */
  lpush(key: CommandKey, ...values: (string | Buffer)[]): Promise<number>;
  /**
   * Prepend a value to a list, only if the list exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   * @returns the length of the list after the push operations
   *
   */
  lpushx(key: CommandKey, value: string | Buffer): Promise<number>;
  /**
   * Get a range of elements from a list.
   *
   * Complexity: O(S+N) where S is the distance of start offset from HEAD for small lists, from nearest end (HEAD or TAIL) for large lists; and N is the number of elements in the specified range.
   *
   * Since Redis v1.0.0
   *
   * @returns list of elements in the specified range
   *
   */
  lrange(key: CommandKey, start: number, stop: number): Promise<string[]>;
  /**
   * Remove elements from a list.
   *
   * Complexity: O(N) where N is the length of the list.
   *
   * Since Redis v1.0.0
   *
   */
  lrem(key: CommandKey, count: number, value: string | Buffer): Promise<any>;
  /**
   * Set the value of an element in a list by its index.
   *
   * Complexity: O(N) where N is the length of the list. Setting either the first or the last element of the list is O(1).
   *
   * Since Redis v1.0.0
   *
   */
  lset(key: CommandKey, index: number, value: string | Buffer): Promise<any>;
  /**
   * Trim a list to the specified range.
   *
   * Complexity: O(N) where N is the number of elements to be removed by the operation.
   *
   * Since Redis v1.0.0
   *
   */
  ltrim(key: CommandKey, start: number, stop: number): Promise<any>;
  /**
   * Outputs memory problems report.
   *
   * Since Redis v4.0.0
   *
   */
  memory(doctor: "doctor"): Promise<any>;
  /**
   * Show helpful text about the different subcommands.
   *
   * Since Redis v4.0.0
   *
   */
  memory(help: "help"): Promise<any>;
  /**
   * Show allocator internal stats.
   *
   * Since Redis v4.0.0
   *
   */
  memory(mallocStats: "malloc-stats"): Promise<any>;
  /**
   * Ask the allocator to release memory.
   *
   * Since Redis v4.0.0
   *
   */
  memory(purge: "purge"): Promise<any>;
  /**
   * Show memory usage details.
   *
   * Since Redis v4.0.0
   *
   */
  memory(stats: "stats"): Promise<any>;
  /**
   * Estimate the memory usage of a key.
   *
   * Complexity: O(N) where N is the number of samples.
   *
   * Since Redis v4.0.0
   *
   */
  memory(usage: "usage", key: CommandKey): Promise<any>;

  memory(
    usage: "usage",
    key: CommandKey,
    samplesOption: "samples" | "SAMPLES",
    samplesKey: number
  ): Promise<any>;
  /**
   * Get the values of all the given keys.
   *
   * Complexity: O(N) where N is the number of keys to retrieve.
   *
   * Since Redis v1.0.0
   *
   */
  mget(...keys: CommandKey[]): Promise<any>;
  module(...args: any[]): Promise<any>;
  /**
   * Move a key to another database.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  move(key: CommandKey, db: number): Promise<any>;
  /**
   * Mark the start of a transaction block.
   *
   * Since Redis v1.2.0
   *
   */
  multi(): Promise<any>;
  /**
   * Inspect the internals of Redis objects.
   *
   * Complexity: O(1) for all the currently implemented subcommands.
   *
   * Since Redis v2.2.3
   *
   */
  object(subcommand: string | Buffer): Promise<any>;

  object(
    subcommand: string | Buffer,
    ...arguments: (string | Buffer)[]
  ): Promise<any>;
  /**
   * Remove the expiration from a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  persist(key: CommandKey): Promise<any>;
  /**
   * Set a key's time to live in milliseconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  pexpire(key: CommandKey, milliseconds: number): Promise<any>;
  /**
   * Adds the specified elements to the specified HyperLogLog.
   *
   * Complexity: O(1) to add every element.
   *
   * Since Redis v2.8.9
   *
   */
  pfadd(key: CommandKey, ...elements: (string | Buffer)[]): Promise<any>;
  /**
   * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
   *
   * Complexity: O(1) with a very small average constant time when called with a single key. O(N) with N being the number of keys, and much bigger constant times, when called with multiple keys.
   *
   * Since Redis v2.8.9
   *
   */
  pfcount(...keys: CommandKey[]): Promise<any>;
  pfdebug(...args: any[]): Promise<any>;
  /**
   * Merge N different HyperLogLogs into a single one.
   *
   * Complexity: O(N) to merge N HyperLogLogs, but with high constant times.
   *
   * Since Redis v2.8.9
   *
   */
  pfmerge(destkey: CommandKey, ...sourcekeys: CommandKey[]): Promise<any>;
  pfselftest(...args: any[]): Promise<any>;
  /**
   * Ping the server.
   *
   * Since Redis v1.0.0
   *
   */
  ping(message: string | Buffer): Promise<any>;

  ping(): Promise<any>;
  post(...args: any[]): Promise<any>;
  /**
   * Set the value and expiration in milliseconds of a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  psetex(
    key: CommandKey,
    milliseconds: number,
    value: string | Buffer
  ): Promise<any>;
  /**
   * Listen for messages published to channels matching the given patterns.
   *
   * Complexity: O(N) where N is the number of patterns the client is already subscribed to.
   *
   * Since Redis v2.0.0
   *
   */
  psubscribe(...patterns: CommandPattern[]): Promise<any>;
  psync(...args: any[]): Promise<any>;
  /**
   * Get the time to live for a key in milliseconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  pttl(key: CommandKey): Promise<any>;
  /**
   * Post a message to a channel.
   *
   * Complexity: O(N+M) where N is the number of clients subscribed to the receiving channel and M is the total number of subscribed patterns (by any client).
   *
   * Since Redis v2.0.0
   *
   */
  publish(channel: string | Buffer, message: string | Buffer): Promise<any>;
  /**
   * Inspect the state of the Pub/Sub subsystem.
   *
   * Complexity: O(N) for the CHANNELS subcommand, where N is the number of active channels, and assuming constant time pattern matching (relatively short channels and patterns). O(N) for the NUMSUB subcommand, where N is the number of requested channels. O(1) for the NUMPAT subcommand.
   *
   * Since Redis v2.8.0
   *
   */
  pubsub(subcommand: string | Buffer): Promise<any>;

  pubsub(
    subcommand: string | Buffer,
    ...arguments: (string | Buffer)[]
  ): Promise<any>;
  /**
   * Stop listening for messages posted to channels matching the given patterns.
   *
   * Complexity: O(N+M) where N is the number of patterns the client is already subscribed and M is the number of total patterns subscribed in the system (by any client).
   *
   * Since Redis v2.0.0
   *
   */
  punsubscribe(...patterns: CommandPattern[]): Promise<any>;

  punsubscribe(): Promise<any>;
  /**
   * Close the connection.
   *
   * Since Redis v1.0.0
   *
   */
  quit(): Promise<any>;
  /**
   * Return a random key from the keyspace.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  randomkey(): Promise<any>;
  /**
   * Enables read queries for a connection to a cluster replica node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  readonly(): Promise<any>;
  /**
   * Disables read queries for a connection to a cluster replica node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  readwrite(): Promise<any>;
  /**
   * Rename a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  rename(key: CommandKey, newkey: CommandKey): Promise<any>;
  /**
   * Rename a key, only if the new key does not exist.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  renamenx(key: CommandKey, newkey: CommandKey): Promise<any>;
  replconf(...args: any[]): Promise<any>;
  /**
   * Make the server a replica of another instance, or promote it as master.
   *
   * Since Redis v5.0.0
   *
   */
  replicaof(host: string | Buffer, port: string | Buffer): Promise<any>;
  /**
   * Create a key using the provided serialized value, previously obtained using DUMP.
   *
   * Complexity: O(1) to create the new key and additional O(N*M) to reconstruct the serialized value, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1). However for sorted set values the complexity is O(N*M*log(N)) because inserting values into sorted sets is O(log(N)).
   *
   * Since Redis v2.6.0
   *
   */
  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    replace: "REPLACE"
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    absttl: "ABSTTL"
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    replace: "REPLACE",
    absttl: "ABSTTL"
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    idletimeOption: "idletime" | "IDLETIME",
    idletimeKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    replace: "REPLACE",
    idletimeOption: "idletime" | "IDLETIME",
    idletimeKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    absttl: "ABSTTL",
    idletimeOption: "idletime" | "IDLETIME",
    idletimeKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    replace: "REPLACE",
    absttl: "ABSTTL",
    idletimeOption: "idletime" | "IDLETIME",
    idletimeKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    freqOption: "freq" | "FREQ",
    freqKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    replace: "REPLACE",
    freqOption: "freq" | "FREQ",
    freqKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    absttl: "ABSTTL",
    freqOption: "freq" | "FREQ",
    freqKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    replace: "REPLACE",
    absttl: "ABSTTL",
    freqOption: "freq" | "FREQ",
    freqKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    idletimeOption: "idletime" | "IDLETIME",
    idletimeKey: number,
    freqOption: "freq" | "FREQ",
    freqKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    replace: "REPLACE",
    idletimeOption: "idletime" | "IDLETIME",
    idletimeKey: number,
    freqOption: "freq" | "FREQ",
    freqKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    absttl: "ABSTTL",
    idletimeOption: "idletime" | "IDLETIME",
    idletimeKey: number,
    freqOption: "freq" | "FREQ",
    freqKey: number
  ): Promise<any>;

  restore(
    key: CommandKey,
    ttl: number,
    serializedValue: string | Buffer,
    replace: "REPLACE",
    absttl: "ABSTTL",
    idletimeOption: "idletime" | "IDLETIME",
    idletimeKey: number,
    freqOption: "freq" | "FREQ",
    freqKey: number
  ): Promise<any>;
  restoreAsking(...args: any[]): Promise<any>;
  /**
   * Return the role of the instance in the context of replication.
   *
   * Since Redis v2.8.12
   *
   */
  role(): Promise<any>;
  /**
   * Remove and get the last element in a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  rpop(key: CommandKey): Promise<any>;
  /**
   * Remove the last element in a list, prepend it to another list and return it.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  rpoplpush(source: CommandKey, destination: CommandKey): Promise<any>;
  /**
   * Append one or multiple values to a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  rpush(key: CommandKey, ...values: (string | Buffer)[]): Promise<any>;
  /**
   * Append a value to a list, only if the list exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  rpushx(key: CommandKey, value: string | Buffer): Promise<any>;
  /**
   * Add one or more members to a set.
   *
   * Complexity: O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.
   *
   * Since Redis v1.0.0
   *
   */
  sadd(key: CommandKey, ...members: (string | Buffer)[]): Promise<any>;
  /**
   * Synchronously save the dataset to disk.
   *
   * Since Redis v1.0.0
   *
   */
  save(): Promise<any>;
  /**
   * Incrementally iterate the keys space.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection.
   *
   * Since Redis v2.8.0
   *
   */
  scan(cursor: number): Promise<any>;

  scan(
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern
  ): Promise<any>;

  scan(
    cursor: number,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  scan(
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;
  /**
   * Get the number of members in a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  scard(key: CommandKey): Promise<any>;
  /**
   * Set the debug mode for executed scripts.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2.0
   *
   */
  script(debug: "debug", mode: "YES" | "SYNC" | "NO"): Promise<any>;
  /**
   * Check existence of scripts in the script cache.
   *
   * Complexity: O(N) with N being the number of scripts to check (so checking a single script is an O(1) operation).
   *
   * Since Redis v2.6.0
   *
   */
  script(exists: "exists", ...sha1s: (string | Buffer)[]): Promise<any>;
  /**
   * Remove all the scripts from the script cache.
   *
   * Complexity: O(N) with N being the number of scripts in cache.
   *
   * Since Redis v2.6.0
   *
   */
  script(flush: "flush"): Promise<any>;
  /**
   * Kill the script currently in execution.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  script(kill: "kill"): Promise<any>;
  /**
   * Load the specified Lua script into the script cache.
   *
   * Complexity: O(N) with N being the length in bytes of the script body.
   *
   * Since Redis v2.6.0
   *
   */
  script(load: "load", script: string | Buffer): Promise<any>;
  /**
   * Subtract multiple sets.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sdiff(...keys: CommandKey[]): Promise<any>;
  /**
   * Subtract multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sdiffstore(destination: CommandKey, ...keys: CommandKey[]): Promise<any>;
  /**
   * Change the selected database for the current connection.
   *
   * Since Redis v1.0.0
   *
   */
  select(index: number): Promise<any>;
  sentinel(...args: any[]): Promise<any>;
  /**
   * Set the string value of a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   * @returns OK if SET was executed correctly. Null if the user specified the NX or XX option but the condition was not met.
   *
   */
  set(key: CommandKey, value: string | Buffer): Promise<"OK">;

  set(
    key: CommandKey,
    value: string | Buffer,
    expirationOption: "expiration" | "EXPIRATION",
    expirationKey: "EX seconds" | "PX milliseconds"
  ): Promise<"OK">;

  set(
    key: CommandKey,
    value: string | Buffer,
    condition: "NX" | "XX"
  ): Promise<"OK">;

  set(
    key: CommandKey,
    value: string | Buffer,
    expirationOption: "expiration" | "EXPIRATION",
    expirationKey: "EX seconds" | "PX milliseconds",
    condition: "NX" | "XX"
  ): Promise<"OK">;
  /**
   * Sets or clears the bit at offset in the string value stored at key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  setbit(key: CommandKey, offset: number, value: string | Buffer): Promise<any>;
  /**
   * Set the value and expiration of a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  setex(key: CommandKey, seconds: number, value: string | Buffer): Promise<any>;
  /**
   * Set the value of a key, only if the key does not exist.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  setnx(key: CommandKey, value: string | Buffer): Promise<any>;
  /**
   * Overwrite part of a string at key starting at the specified offset.
   *
   * Complexity: O(1), not counting the time taken to copy the new string in place. Usually, this string is very small so the amortized complexity is O(1). Otherwise, complexity is O(M) with M being the length of the value argument.
   *
   * Since Redis v2.2.0
   *
   */
  setrange(
    key: CommandKey,
    offset: number,
    value: string | Buffer
  ): Promise<any>;
  /**
   * Synchronously save the dataset to disk and then shut down the server.
   *
   * Since Redis v1.0.0
   *
   */
  shutdown(saveMode: "NOSAVE" | "SAVE"): Promise<any>;

  shutdown(): Promise<any>;
  /**
   * Intersect multiple sets.
   *
   * Complexity: O(N*M) worst case where N is the cardinality of the smallest set and M is the number of sets.
   *
   * Since Redis v1.0.0
   *
   */
  sinter(...keys: CommandKey[]): Promise<any>;
  /**
   * Intersect multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N*M) worst case where N is the cardinality of the smallest set and M is the number of sets.
   *
   * Since Redis v1.0.0
   *
   */
  sinterstore(destination: CommandKey, ...keys: CommandKey[]): Promise<any>;
  /**
   * Determine if a given value is a member of a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  sismember(key: CommandKey, member: string | Buffer): Promise<any>;
  /**
   * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
   *
   * Since Redis v1.0.0
   *
   */
  slaveof(host: string | Buffer, port: string | Buffer): Promise<any>;
  /**
   * Manages the Redis slow queries log.
   *
   * Since Redis v2.2.12
   *
   */
  slowlog(subcommand: string | Buffer): Promise<any>;

  slowlog(subcommand: string | Buffer, argument: string | Buffer): Promise<any>;
  /**
   * Get all the members in a set.
   *
   * Complexity: O(N) where N is the set cardinality.
   *
   * Since Redis v1.0.0
   *
   */
  smembers(key: CommandKey): Promise<any>;
  /**
   * Move a member from one set to another.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  smove(
    source: CommandKey,
    destination: CommandKey,
    member: string | Buffer
  ): Promise<any>;
  /**
   * Remove and return one or multiple random members from a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  spop(key: CommandKey): Promise<any>;

  spop(key: CommandKey, count: number): Promise<any>;
  /**
   * Get one or multiple random members from a set.
   *
   * Complexity: Without the count argument O(1), otherwise O(N) where N is the absolute value of the passed count.
   *
   * Since Redis v1.0.0
   *
   */
  srandmember(key: CommandKey): Promise<any>;

  srandmember(key: CommandKey, count: number): Promise<any>;
  /**
   * Remove one or more members from a set.
   *
   * Complexity: O(N) where N is the number of members to be removed.
   *
   * Since Redis v1.0.0
   *
   */
  srem(key: CommandKey, ...members: (string | Buffer)[]): Promise<any>;
  /**
   * Incrementally iterate Set elements.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..
   *
   * Since Redis v2.8.0
   *
   */
  sscan(key: CommandKey, cursor: number): Promise<any>;

  sscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern
  ): Promise<any>;

  sscan(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  sscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;
  /**
   * Get the length of the value stored in a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  strlen(key: CommandKey): Promise<any>;
  /**
   * Listen for messages published to the given channels.
   *
   * Complexity: O(N) where N is the number of channels to subscribe to.
   *
   * Since Redis v2.0.0
   *
   */
  subscribe(...channels: (string | Buffer)[]): Promise<any>;
  substr(...args: any[]): Promise<any>;
  /**
   * Add multiple sets.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sunion(...keys: CommandKey[]): Promise<any>;
  /**
   * Add multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sunionstore(destination: CommandKey, ...keys: CommandKey[]): Promise<any>;
  /**
   * Swaps two Redis databases.
   *
   * Since Redis v4.0.0
   *
   */
  swapdb(index: number, index1: number): Promise<any>;
  /**
   * Internal command used for replication.
   *
   * Since Redis v1.0.0
   *
   */
  sync(): Promise<any>;
  /**
   * Return the current server time.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  time(): Promise<any>;
  /**
   * Alters the last access time of a key(s). Returns the number of existing keys specified.
   *
   * Complexity: O(N) where N is the number of keys that will be touched.
   *
   * Since Redis v3.2.1
   *
   */
  touch(...keys: CommandKey[]): Promise<any>;
  /**
   * Get the time to live for a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  ttl(key: CommandKey): Promise<any>;
  /**
   * Determine the type stored at key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  type(key: CommandKey): Promise<any>;
  /**
   * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
   *
   * Complexity: O(1) for each key removed regardless of its size. Then the command does O(N) work in a different thread in order to reclaim memory, where N is the number of allocations the deleted objects where composed of.
   *
   * Since Redis v4.0.0
   *
   */
  unlink(...keys: CommandKey[]): Promise<any>;
  /**
   * Stop listening for messages posted to the given channels.
   *
   * Complexity: O(N) where N is the number of clients already subscribed to a channel.
   *
   * Since Redis v2.0.0
   *
   */
  unsubscribe(...channels: (string | Buffer)[]): Promise<any>;

  unsubscribe(): Promise<any>;
  /**
   * Forget about all watched keys.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  unwatch(): Promise<any>;
  /**
   * Wait for the synchronous replication of all the write commands sent in the context of the current connection.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  wait(numreplicas: number, timeout: number): Promise<any>;
  /**
   * Watch the given keys to determine execution of the MULTI/EXEC block.
   *
   * Complexity: O(1) for every key.
   *
   * Since Redis v2.2.0
   *
   */
  watch(...keys: CommandKey[]): Promise<any>;
  /**
   * Marks a pending message as correctly processed, effectively removing it from the pending entries list of the consumer group. Return value of the command is the number of messages successfully acknowledged, that is, the IDs we were actually able to resolve in the PEL.
   *
   * Complexity: O(1) for each message ID processed.
   *
   * Since Redis v5.0.0
   *
   */
  xack(
    key: CommandKey,
    group: string | Buffer,
    ...ids: (string | Buffer)[]
  ): Promise<any>;
  /**
   * Removes the specified entries from the stream. Returns the number of items actually deleted, that may be different from the number of IDs passed in case certain IDs do not exist.
   *
   * Complexity: O(1) for each single item to delete in the stream, regardless of the stream size.
   *
   * Since Redis v5.0.0
   *
   */
  xdel(key: CommandKey, ...ids: (string | Buffer)[]): Promise<any>;
  /**
   * Create, destroy, and manage consumer groups.
   *
   * Complexity: O(1) for all the subcommands, with the exception of the DESTROY subcommand which takes an additional O(M) time in order to delete the M entries inside the consumer group pending entries list (PEL).
   *
   * Since Redis v5.0.0
   *
   */
  xgroup(
    createOption: "create" | "CREATE",
    key: CommandKey,
    groupname: string | Buffer,
    idOr: string | Buffer
  ): Promise<any>;

  xgroup(): Promise<any>;

  xgroup(
    createOption: "create" | "CREATE",
    key: CommandKey,
    groupname: string | Buffer,
    idOr: string | Buffer,
    setidOption: "setid" | "SETID",
    key1: CommandKey,
    groupname1: string | Buffer,
    idOr1: string | Buffer
  ): Promise<any>;

  xgroup(
    setidOption: "setid" | "SETID",
    key1: CommandKey,
    groupname1: string | Buffer,
    idOr1: string | Buffer
  ): Promise<any>;

  xgroup(
    createOption: "create" | "CREATE",
    key: CommandKey,
    groupname: string | Buffer,
    idOr: string | Buffer,
    destroyOption: "destroy" | "DESTROY",
    key2: CommandKey,
    groupname2: string | Buffer
  ): Promise<any>;

  xgroup(
    destroyOption: "destroy" | "DESTROY",
    key2: CommandKey,
    groupname2: string | Buffer
  ): Promise<any>;

  xgroup(
    createOption: "create" | "CREATE",
    key: CommandKey,
    groupname: string | Buffer,
    idOr: string | Buffer,
    setidOption: "setid" | "SETID",
    key1: CommandKey,
    groupname1: string | Buffer,
    idOr1: string | Buffer,
    destroyOption: "destroy" | "DESTROY",
    key2: CommandKey,
    groupname2: string | Buffer
  ): Promise<any>;

  xgroup(
    setidOption: "setid" | "SETID",
    key1: CommandKey,
    groupname1: string | Buffer,
    idOr1: string | Buffer,
    destroyOption: "destroy" | "DESTROY",
    key2: CommandKey,
    groupname2: string | Buffer
  ): Promise<any>;

  xgroup(
    createOption: "create" | "CREATE",
    key: CommandKey,
    groupname: string | Buffer,
    idOr: string | Buffer,
    delconsumerOption: "delconsumer" | "DELCONSUMER",
    key3: CommandKey,
    groupname3: string | Buffer,
    consumername: string | Buffer
  ): Promise<any>;

  xgroup(
    delconsumerOption: "delconsumer" | "DELCONSUMER",
    key3: CommandKey,
    groupname3: string | Buffer,
    consumername: string | Buffer
  ): Promise<any>;

  xgroup(
    createOption: "create" | "CREATE",
    key: CommandKey,
    groupname: string | Buffer,
    idOr: string | Buffer,
    setidOption: "setid" | "SETID",
    key1: CommandKey,
    groupname1: string | Buffer,
    idOr1: string | Buffer,
    delconsumerOption: "delconsumer" | "DELCONSUMER",
    key3: CommandKey,
    groupname3: string | Buffer,
    consumername: string | Buffer
  ): Promise<any>;

  xgroup(
    setidOption: "setid" | "SETID",
    key1: CommandKey,
    groupname1: string | Buffer,
    idOr1: string | Buffer,
    delconsumerOption: "delconsumer" | "DELCONSUMER",
    key3: CommandKey,
    groupname3: string | Buffer,
    consumername: string | Buffer
  ): Promise<any>;

  xgroup(
    createOption: "create" | "CREATE",
    key: CommandKey,
    groupname: string | Buffer,
    idOr: string | Buffer,
    destroyOption: "destroy" | "DESTROY",
    key2: CommandKey,
    groupname2: string | Buffer,
    delconsumerOption: "delconsumer" | "DELCONSUMER",
    key3: CommandKey,
    groupname3: string | Buffer,
    consumername: string | Buffer
  ): Promise<any>;

  xgroup(
    destroyOption: "destroy" | "DESTROY",
    key2: CommandKey,
    groupname2: string | Buffer,
    delconsumerOption: "delconsumer" | "DELCONSUMER",
    key3: CommandKey,
    groupname3: string | Buffer,
    consumername: string | Buffer
  ): Promise<any>;

  xgroup(
    createOption: "create" | "CREATE",
    key: CommandKey,
    groupname: string | Buffer,
    idOr: string | Buffer,
    setidOption: "setid" | "SETID",
    key1: CommandKey,
    groupname1: string | Buffer,
    idOr1: string | Buffer,
    destroyOption: "destroy" | "DESTROY",
    key2: CommandKey,
    groupname2: string | Buffer,
    delconsumerOption: "delconsumer" | "DELCONSUMER",
    key3: CommandKey,
    groupname3: string | Buffer,
    consumername: string | Buffer
  ): Promise<any>;

  xgroup(
    setidOption: "setid" | "SETID",
    key1: CommandKey,
    groupname1: string | Buffer,
    idOr1: string | Buffer,
    destroyOption: "destroy" | "DESTROY",
    key2: CommandKey,
    groupname2: string | Buffer,
    delconsumerOption: "delconsumer" | "DELCONSUMER",
    key3: CommandKey,
    groupname3: string | Buffer,
    consumername: string | Buffer
  ): Promise<any>;
  /**
   * Get information on streams and consumer groups.
   *
   * Complexity: O(N) with N being the number of returned items for the subcommands CONSUMERS and GROUPS. The STREAM subcommand is O(log N) with N being the number of items in the stream.
   *
   * Since Redis v5.0.0
   *
   */
  xinfo(
    consumersOption: "consumers" | "CONSUMERS",
    key: CommandKey,
    groupname: string | Buffer
  ): Promise<any>;

  xinfo(): Promise<any>;

  xinfo(
    consumersOption: "consumers" | "CONSUMERS",
    key: CommandKey,
    groupname: string | Buffer,
    groupsOption: "groups" | "GROUPS",
    groupsKey: CommandKey
  ): Promise<any>;

  xinfo(groupsOption: "groups" | "GROUPS", groupsKey: CommandKey): Promise<any>;

  xinfo(
    consumersOption: "consumers" | "CONSUMERS",
    key: CommandKey,
    groupname: string | Buffer,
    streamOption: "stream" | "STREAM",
    streamKey: CommandKey
  ): Promise<any>;

  xinfo(streamOption: "stream" | "STREAM", streamKey: CommandKey): Promise<any>;

  xinfo(
    consumersOption: "consumers" | "CONSUMERS",
    key: CommandKey,
    groupname: string | Buffer,
    groupsOption: "groups" | "GROUPS",
    groupsKey: CommandKey,
    streamOption: "stream" | "STREAM",
    streamKey: CommandKey
  ): Promise<any>;

  xinfo(
    groupsOption: "groups" | "GROUPS",
    groupsKey: CommandKey,
    streamOption: "stream" | "STREAM",
    streamKey: CommandKey
  ): Promise<any>;

  xinfo(
    consumersOption: "consumers" | "CONSUMERS",
    key: CommandKey,
    groupname: string | Buffer,
    help: "HELP"
  ): Promise<any>;

  xinfo(help: "HELP"): Promise<any>;

  xinfo(
    consumersOption: "consumers" | "CONSUMERS",
    key: CommandKey,
    groupname: string | Buffer,
    groupsOption: "groups" | "GROUPS",
    groupsKey: CommandKey,
    help: "HELP"
  ): Promise<any>;

  xinfo(
    groupsOption: "groups" | "GROUPS",
    groupsKey: CommandKey,
    help: "HELP"
  ): Promise<any>;

  xinfo(
    consumersOption: "consumers" | "CONSUMERS",
    key: CommandKey,
    groupname: string | Buffer,
    streamOption: "stream" | "STREAM",
    streamKey: CommandKey,
    help: "HELP"
  ): Promise<any>;

  xinfo(
    streamOption: "stream" | "STREAM",
    streamKey: CommandKey,
    help: "HELP"
  ): Promise<any>;

  xinfo(
    consumersOption: "consumers" | "CONSUMERS",
    key: CommandKey,
    groupname: string | Buffer,
    groupsOption: "groups" | "GROUPS",
    groupsKey: CommandKey,
    streamOption: "stream" | "STREAM",
    streamKey: CommandKey,
    help: "HELP"
  ): Promise<any>;

  xinfo(
    groupsOption: "groups" | "GROUPS",
    groupsKey: CommandKey,
    streamOption: "stream" | "STREAM",
    streamKey: CommandKey,
    help: "HELP"
  ): Promise<any>;
  /**
   * Return the number of entires in a stream.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   */
  xlen(key: CommandKey): Promise<any>;
  /**
   * Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.
   *
   * Complexity: O(N) with N being the number of elements returned, so asking for a small fixed number of entries per call is O(1). When the command returns just the summary it runs in O(1) time assuming the list of consumers is small, otherwise there is additional O(N) time needed to iterate every consumer.
   *
   * Since Redis v5.0.0
   *
   */
  xpending(key: CommandKey, group: string | Buffer): Promise<any>;

  xpending(
    key: CommandKey,
    group: string | Buffer,
    start: string | Buffer,
    end: string | Buffer,
    count: number
  ): Promise<any>;

  xpending(
    key: CommandKey,
    group: string | Buffer,
    consumer: string | Buffer
  ): Promise<any>;

  xpending(
    key: CommandKey,
    group: string | Buffer,
    start: string | Buffer,
    end: string | Buffer,
    count: number,
    consumer: string | Buffer
  ): Promise<any>;
  /**
   * Return a range of elements in a stream, with IDs matching the specified IDs interval.
   *
   * Complexity: O(N) with N being the number of elements being returned. If N is constant (e.g. always asking for the first 10 elements with COUNT), you can consider it O(1).
   *
   * Since Redis v5.0.0
   *
   */
  xrange(
    key: CommandKey,
    start: string | Buffer,
    end: string | Buffer
  ): Promise<any>;

  xrange(
    key: CommandKey,
    start: string | Buffer,
    end: string | Buffer,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;
  /**
   * Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE.
   *
   * Complexity: O(N) with N being the number of elements returned. If N is constant (e.g. always asking for the first 10 elements with COUNT), you can consider it O(1).
   *
   * Since Redis v5.0.0
   *
   */
  xrevrange(
    key: CommandKey,
    end: string | Buffer,
    start: string | Buffer
  ): Promise<any>;

  xrevrange(
    key: CommandKey,
    end: string | Buffer,
    start: string | Buffer,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;
  xsetid(...args: any[]): Promise<any>;
  /**
   * Trims the stream to (approximately if '~' is passed) a certain size.
   *
   * Complexity: O(N), with N being the number of evicted entries. Constant times are very small however, since entries are organized in macro nodes containing multiple entries that can be released with a single deallocation.
   *
   * Since Redis v5.0.0
   *
   */
  xtrim(key: CommandKey, strategy: "MAXLEN", count: number): Promise<any>;

  xtrim(
    key: CommandKey,
    strategy: "MAXLEN",
    approx: "~",
    count: number
  ): Promise<any>;
  /**
   * Get the number of members in a sorted set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  zcard(key: CommandKey): Promise<any>;
  /**
   * Count the members in a sorted set with scores within the given values.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v2.0.0
   *
   */
  zcount(key: CommandKey, min: number, max: number): Promise<any>;
  /**
   * Increment the score of a member in a sorted set.
   *
   * Complexity: O(log(N)) where N is the number of elements in the sorted set.
   *
   * Since Redis v1.2.0
   *
   */
  zincrby(
    key: CommandKey,
    increment: number,
    member: string | Buffer
  ): Promise<any>;
  /**
   * Count the number of members in a sorted set between a given lexicographical range.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v2.8.9
   *
   */
  zlexcount(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer
  ): Promise<any>;
  /**
   * Remove and return members with the highest scores in a sorted set.
   *
   * Complexity: O(log(N)*M) with N being the number of elements in the sorted set, and M being the number of elements popped.
   *
   * Since Redis v5.0.0
   *
   */
  zpopmax(key: CommandKey): Promise<any>;

  zpopmax(key: CommandKey, count: number): Promise<any>;
  /**
   * Remove and return members with the lowest scores in a sorted set.
   *
   * Complexity: O(log(N)*M) with N being the number of elements in the sorted set, and M being the number of elements popped.
   *
   * Since Redis v5.0.0
   *
   */
  zpopmin(key: CommandKey): Promise<any>;

  zpopmin(key: CommandKey, count: number): Promise<any>;
  /**
   * Return a range of members in a sorted set, by index.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
   *
   * Since Redis v1.2.0
   *
   */
  zrange(key: CommandKey, start: number, stop: number): Promise<any>;

  zrange(
    key: CommandKey,
    start: number,
    stop: number,
    withscores: "WITHSCORES"
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by lexicographical range.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v2.8.9
   *
   */
  zrangebylex(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer
  ): Promise<any>;

  zrangebylex(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by score.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v1.0.5
   *
   */
  zrangebyscore(key: CommandKey, min: number, max: number): Promise<any>;

  zrangebyscore(
    key: CommandKey,
    min: number,
    max: number,
    withscores: "WITHSCORES"
  ): Promise<any>;

  zrangebyscore(
    key: CommandKey,
    min: number,
    max: number,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number
  ): Promise<any>;

  zrangebyscore(
    key: CommandKey,
    min: number,
    max: number,
    withscores: "WITHSCORES",
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number
  ): Promise<any>;
  /**
   * Determine the index of a member in a sorted set.
   *
   * Complexity: O(log(N))
   *
   * Since Redis v2.0.0
   *
   */
  zrank(key: CommandKey, member: string | Buffer): Promise<any>;
  /**
   * Remove one or more members from a sorted set.
   *
   * Complexity: O(M*log(N)) with N being the number of elements in the sorted set and M the number of elements to be removed.
   *
   * Since Redis v1.2.0
   *
   */
  zrem(key: CommandKey, ...members: (string | Buffer)[]): Promise<any>;
  /**
   * Remove all members in a sorted set between the given lexicographical range.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.
   *
   * Since Redis v2.8.9
   *
   */
  zremrangebylex(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer
  ): Promise<any>;
  /**
   * Remove all members in a sorted set within the given indexes.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.
   *
   * Since Redis v2.0.0
   *
   */
  zremrangebyrank(key: CommandKey, start: number, stop: number): Promise<any>;
  /**
   * Remove all members in a sorted set within the given scores.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.
   *
   * Since Redis v1.2.0
   *
   */
  zremrangebyscore(key: CommandKey, min: number, max: number): Promise<any>;
  /**
   * Return a range of members in a sorted set, by index, with scores ordered from high to low.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
   *
   * Since Redis v1.2.0
   *
   */
  zrevrange(key: CommandKey, start: number, stop: number): Promise<any>;

  zrevrange(
    key: CommandKey,
    start: number,
    stop: number,
    withscores: "WITHSCORES"
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v2.8.9
   *
   */
  zrevrangebylex(
    key: CommandKey,
    max: string | Buffer,
    min: string | Buffer
  ): Promise<any>;

  zrevrangebylex(
    key: CommandKey,
    max: string | Buffer,
    min: string | Buffer,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by score, with scores ordered from high to low.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v2.2.0
   *
   */
  zrevrangebyscore(key: CommandKey, max: number, min: number): Promise<any>;

  zrevrangebyscore(
    key: CommandKey,
    max: number,
    min: number,
    withscores: "WITHSCORES"
  ): Promise<any>;

  zrevrangebyscore(
    key: CommandKey,
    max: number,
    min: number,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number
  ): Promise<any>;

  zrevrangebyscore(
    key: CommandKey,
    max: number,
    min: number,
    withscores: "WITHSCORES",
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number
  ): Promise<any>;
  /**
   * Determine the index of a member in a sorted set, with scores ordered from high to low.
   *
   * Complexity: O(log(N))
   *
   * Since Redis v2.0.0
   *
   */
  zrevrank(key: CommandKey, member: string | Buffer): Promise<any>;
  /**
   * Incrementally iterate sorted sets elements and associated scores.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection.
   *
   * Since Redis v2.8.0
   *
   */
  zscan(key: CommandKey, cursor: number): Promise<any>;

  zscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern
  ): Promise<any>;

  zscan(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;

  zscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number
  ): Promise<any>;
  /**
   * Get the score associated with the given member in a sorted set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  zscore(key: CommandKey, member: string | Buffer): Promise<any>;
}
