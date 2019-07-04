import { CallbackFunction } from "./types";

export type TypeMapper<T, K> = T extends Promise<any> ? K : T;
export type CommandKey = string | Buffer | number;
export type CommandPattern = string | Buffer;

export interface ICommander {
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
  append(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<number>
  ): Promise<number>;
  asking(...args: any[]): Promise<any>;
  askingBuffer(...args: any[]): Promise<any>;
  /**
   * Authenticate to the server.
   *
   * Since Redis v1.0.0
   *
   */
  auth(
    password: string | Buffer,
    callback?: CallbackFunction<"OK">
  ): Promise<"OK">;
  /**
   * Asynchronously rewrite the append-only file.
   *
   * Since Redis v1.0.0
   *
   */
  bgrewriteaof(callback?: CallbackFunction<"OK">): Promise<"OK">;
  /**
   * Asynchronously save the dataset to disk.
   *
   * Since Redis v1.0.0
   *
   */
  bgsave(callback?: CallbackFunction<"OK">): Promise<"OK">;
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
  bitcount(
    key: CommandKey,
    callback?: CallbackFunction<number>
  ): Promise<number>;

  bitcount(
    key: CommandKey,
    start: number,
    end: number,
    callback?: CallbackFunction<number>
  ): Promise<number>;
  /**
   * Perform arbitrary bitfield integer operations on strings.
   *
   * Complexity: O(1) for each subcommand specified.
   *
   * Since Redis v3.2.0
   *
   */
  bitfield(...args: any[]): Promise<any>;
  /**
   * Perform arbitrary bitfield integer operations on strings.
   *
   * Complexity: O(1) for each subcommand specified.
   *
   * Since Redis v3.2.0
   *
   */
  bitfieldBuffer(...args: any[]): Promise<any>;
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
  bitop(...args: any[]): Promise<number>;
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
  bitpos(
    key: CommandKey,
    bit: number,
    callback?: CallbackFunction<number>
  ): Promise<number>;

  bitpos(
    key: CommandKey,
    bit: number,
    start: number,
    callback?: CallbackFunction<number>
  ): Promise<number>;

  bitpos(
    key: CommandKey,
    bit: number,
    end: number,
    callback?: CallbackFunction<number>
  ): Promise<number>;

  bitpos(
    key: CommandKey,
    bit: number,
    start: number,
    end: number,
    callback?: CallbackFunction<number>
  ): Promise<number>;
  /**
   * Remove and get the first element in a list, or block until one is available.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  blpop(...args: any[]): Promise<any>;
  /**
   * Remove and get the first element in a list, or block until one is available.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  blpopBuffer(...args: any[]): Promise<any>;
  /**
   * Remove and get the last element in a list, or block until one is available.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  brpop(...args: any[]): Promise<any>;
  /**
   * Remove and get the last element in a list, or block until one is available.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  brpopBuffer(...args: any[]): Promise<any>;
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
    timeout: number,
    callback?: CallbackFunction<string>
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
    timeout: number,
    callback?: CallbackFunction<Buffer>
  ): Promise<Buffer>;
  /**
   * Remove and return the member with the highest score from one or more sorted sets, or block until one is available.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v5.0.0
   *
   */
  bzpopmax(...args: any[]): Promise<any>;
  /**
   * Remove and return the member with the highest score from one or more sorted sets, or block until one is available.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v5.0.0
   *
   */
  bzpopmaxBuffer(...args: any[]): Promise<any>;
  /**
   * Remove and return the member with the lowest score from one or more sorted sets, or block until one is available.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v5.0.0
   *
   */
  bzpopmin(...args: any[]): Promise<any>;
  /**
   * Remove and return the member with the lowest score from one or more sorted sets, or block until one is available.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v5.0.0
   *
   */
  bzpopminBuffer(...args: any[]): Promise<any>;
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
  client(
    getname: "getname",
    callback?: CallbackFunction<string>
  ): Promise<string>;
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
  clientBuffer(
    getname: "getname",
    callback?: CallbackFunction<Buffer>
  ): Promise<Buffer>;
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
  client(id: "id", callback?: CallbackFunction<number>): Promise<number>;
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
  client(...args: any[]): Promise<"OK" | number>;
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
    typeKey: "normal" | "master" | "replica" | "pubsub",
    callback?: CallbackFunction<string>
  ): Promise<string>;

  client(list: "list", callback?: CallbackFunction<string>): Promise<string>;
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
    typeKey: "normal" | "master" | "replica" | "pubsub",
    callback?: CallbackFunction<Buffer>
  ): Promise<Buffer>;

  clientBuffer(
    list: "list",
    callback?: CallbackFunction<Buffer>
  ): Promise<Buffer>;
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
  client(
    pause: "pause",
    timeout: number,
    callback?: CallbackFunction<"OK">
  ): Promise<"OK">;
  /**
   * Instruct the server whether to reply to commands.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2
   *
   */
  client(
    reply: "reply",
    replyMode: "ON" | "OFF" | "SKIP",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Instruct the server whether to reply to commands.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2
   *
   */
  clientBuffer(
    reply: "reply",
    replyMode: "ON" | "OFF" | "SKIP",
    callback?: CallbackFunction<any>
  ): Promise<any>;
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
  client(
    setname: "setname",
    connectionName: string | Buffer,
    callback?: CallbackFunction<"OK">
  ): Promise<"OK">;
  /**
   * Unblock a client blocked in a blocking command from a different connection.
   *
   * Complexity: O(log N) where N is the number of client connections.
   *
   * Since Redis v5.0.0
   *
   */
  client(
    unblock: "unblock",
    clientId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  client(
    unblock: "unblock",
    clientId: string | Buffer,
    unblockType: "TIMEOUT" | "ERROR",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Unblock a client blocked in a blocking command from a different connection.
   *
   * Complexity: O(log N) where N is the number of client connections.
   *
   * Since Redis v5.0.0
   *
   */
  clientBuffer(
    unblock: "unblock",
    clientId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  clientBuffer(
    unblock: "unblock",
    clientId: string | Buffer,
    unblockType: "TIMEOUT" | "ERROR",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Assign new hash slots to receiving node.
   *
   * Complexity: O(N) where N is the total number of hash slot arguments.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(...args: any[]): Promise<any>;
  /**
   * Assign new hash slots to receiving node.
   *
   * Complexity: O(N) where N is the total number of hash slot arguments.
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(...args: any[]): Promise<any>;
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
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return the number of failure reports active for a given node.
   *
   * Complexity: O(N) where N is the number of failure reports.
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    countFailureReports: "count-failure-reports",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return the number of local keys in the specified hash slot.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    countkeysinslot: "countkeysinslot",
    slot: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return the number of local keys in the specified hash slot.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    countkeysinslot: "countkeysinslot",
    slot: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set hash slots as unbound in receiving node.
   *
   * Complexity: O(N) where N is the total number of hash slot arguments.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(...args: any[]): Promise<any>;
  /**
   * Set hash slots as unbound in receiving node.
   *
   * Complexity: O(N) where N is the total number of hash slot arguments.
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(...args: any[]): Promise<any>;
  /**
   * Forces a replica to perform a manual failover of its master.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    failover: "failover",
    options: "FORCE" | "TAKEOVER",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  cluster(failover: "failover", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Forces a replica to perform a manual failover of its master.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    failover: "failover",
    options: "FORCE" | "TAKEOVER",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  clusterBuffer(
    failover: "failover",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove a node from the nodes table.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    forget: "forget",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove a node from the nodes table.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    forget: "forget",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
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
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return local key names in the specified hash slot.
   *
   * Complexity: O(log(N)) where N is the number of requested keys.
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    getkeysinslot: "getkeysinslot",
    slot: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Provides info about Redis Cluster node state.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(info: "info", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Provides info about Redis Cluster node state.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(info: "info", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Returns the hash slot of the specified key.
   *
   * Complexity: O(N) where N is the number of bytes in the key.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    keyslot: "keyslot",
    key: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Returns the hash slot of the specified key.
   *
   * Complexity: O(N) where N is the number of bytes in the key.
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    keyslot: "keyslot",
    key: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Force a node cluster to handshake with another node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    meet: "meet",
    ip: string | Buffer,
    port: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Force a node cluster to handshake with another node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    meet: "meet",
    ip: string | Buffer,
    port: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get Cluster config for the node.
   *
   * Complexity: O(N) where N is the total number of Cluster nodes.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(nodes: "nodes", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get Cluster config for the node.
   *
   * Complexity: O(N) where N is the total number of Cluster nodes.
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(nodes: "nodes", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * List replica nodes of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   */
  cluster(
    replicas: "replicas",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * List replica nodes of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   */
  clusterBuffer(
    replicas: "replicas",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Reconfigure a node as a replica of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    replicate: "replicate",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Reconfigure a node as a replica of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    replicate: "replicate",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Reset a Redis Cluster node.
   *
   * Complexity: O(N) where N is the number of known nodes. The command may execute a FLUSHALL as a side effect.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    reset: "reset",
    resetType: "HARD" | "SOFT",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  cluster(reset: "reset", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Reset a Redis Cluster node.
   *
   * Complexity: O(N) where N is the number of known nodes. The command may execute a FLUSHALL as a side effect.
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    reset: "reset",
    resetType: "HARD" | "SOFT",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  clusterBuffer(reset: "reset", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Forces the node to save cluster state on disk.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    saveconfig: "saveconfig",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Forces the node to save cluster state on disk.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    saveconfig: "saveconfig",
    callback?: CallbackFunction<any>
  ): Promise<any>;
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
    configEpoch: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the configuration epoch in a new node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    setConfigEpoch: "set-config-epoch",
    configEpoch: number,
    callback?: CallbackFunction<any>
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
    subcommand: "IMPORTING" | "MIGRATING" | "STABLE" | "NODE",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  cluster(
    setslot: "setslot",
    slot: number,
    subcommand: "IMPORTING" | "MIGRATING" | "STABLE" | "NODE",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Bind a hash slot to a specific node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    setslot: "setslot",
    slot: number,
    subcommand: "IMPORTING" | "MIGRATING" | "STABLE" | "NODE",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  clusterBuffer(
    setslot: "setslot",
    slot: number,
    subcommand: "IMPORTING" | "MIGRATING" | "STABLE" | "NODE",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * List replica nodes of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  cluster(
    slaves: "slaves",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * List replica nodes of the specified master node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(
    slaves: "slaves",
    nodeId: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get array of Cluster slot to node mappings.
   *
   * Complexity: O(N) where N is the total number of Cluster nodes.
   *
   * Since Redis v3.0.0
   *
   */
  cluster(slots: "slots", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get array of Cluster slot to node mappings.
   *
   * Complexity: O(N) where N is the total number of Cluster nodes.
   *
   * Since Redis v3.0.0
   *
   */
  clusterBuffer(slots: "slots", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get array of Redis command details.
   *
   * Complexity: O(N) where N is the total number of Redis commands.
   *
   * Since Redis v2.8.13
   *
   */
  command(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get array of Redis command details.
   *
   * Complexity: O(N) where N is the total number of Redis commands.
   *
   * Since Redis v2.8.13
   *
   */
  commandBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get total number of Redis commands.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.8.13
   *
   */
  command(count: "count", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get total number of Redis commands.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.8.13
   *
   */
  commandBuffer(count: "count", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Extract keys given a full Redis command.
   *
   * Complexity: O(N) where N is the number of arguments to the command.
   *
   * Since Redis v2.8.13
   *
   */
  command(getkeys: "getkeys", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Extract keys given a full Redis command.
   *
   * Complexity: O(N) where N is the number of arguments to the command.
   *
   * Since Redis v2.8.13
   *
   */
  commandBuffer(
    getkeys: "getkeys",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get array of specific Redis command details.
   *
   * Complexity: O(N) when N is number of commands to look up.
   *
   * Since Redis v2.8.13
   *
   */
  command(...args: any[]): Promise<any>;
  /**
   * Get array of specific Redis command details.
   *
   * Complexity: O(N) when N is number of commands to look up.
   *
   * Since Redis v2.8.13
   *
   */
  commandBuffer(...args: any[]): Promise<any>;
  /**
   * Get the value of a configuration parameter.
   *
   * Since Redis v2.0.0
   *
   */
  config(
    get: "get",
    parameter: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the value of a configuration parameter.
   *
   * Since Redis v2.0.0
   *
   */
  configBuffer(
    get: "get",
    parameter: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Reset the stats returned by INFO.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  config(
    resetstat: "resetstat",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Reset the stats returned by INFO.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  configBuffer(
    resetstat: "resetstat",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Rewrite the configuration file with the in memory configuration.
   *
   * Since Redis v2.8.0
   *
   */
  config(rewrite: "rewrite", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Rewrite the configuration file with the in memory configuration.
   *
   * Since Redis v2.8.0
   *
   */
  configBuffer(
    rewrite: "rewrite",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set a configuration parameter to the given value.
   *
   * Since Redis v2.0.0
   *
   */
  config(
    set: "set",
    parameter: string | Buffer,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set a configuration parameter to the given value.
   *
   * Since Redis v2.0.0
   *
   */
  configBuffer(
    set: "set",
    parameter: string | Buffer,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return the number of keys in the selected database.
   *
   * Since Redis v1.0.0
   *
   */
  dbsize(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return the number of keys in the selected database.
   *
   * Since Redis v1.0.0
   *
   */
  dbsizeBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get debugging information about a key.
   *
   * Since Redis v1.0.0
   *
   */
  debug(
    object: "object",
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get debugging information about a key.
   *
   * Since Redis v1.0.0
   *
   */
  debugBuffer(
    object: "object",
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Make the server crash.
   *
   * Since Redis v1.0.0
   *
   */
  debug(segfault: "segfault", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Make the server crash.
   *
   * Since Redis v1.0.0
   *
   */
  debugBuffer(
    segfault: "segfault",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Decrement the integer value of a key by one.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  decr(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Decrement the integer value of a key by one.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  decrBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Decrement the integer value of a key by the given number.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  decrby(
    key: CommandKey,
    decrement: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Decrement the integer value of a key by the given number.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  decrbyBuffer(
    key: CommandKey,
    decrement: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Delete a key.
   *
   * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
   *
   * Since Redis v1.0.0
   *
   */
  del(...args: any[]): Promise<any>;
  /**
   * Delete a key.
   *
   * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
   *
   * Since Redis v1.0.0
   *
   */
  delBuffer(...args: any[]): Promise<any>;
  /**
   * Discard all commands issued after MULTI.
   *
   * Since Redis v2.0.0
   *
   */
  discard(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Discard all commands issued after MULTI.
   *
   * Since Redis v2.0.0
   *
   */
  discardBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return a serialized version of the value stored at the specified key.
   *
   * Complexity: O(1) to access the key and additional O(N*M) to serialized it, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1).
   *
   * Since Redis v2.6.0
   *
   */
  dump(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return a serialized version of the value stored at the specified key.
   *
   * Complexity: O(1) to access the key and additional O(N*M) to serialized it, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1).
   *
   * Since Redis v2.6.0
   *
   */
  dumpBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Echo the given string.
   *
   * Since Redis v1.0.0
   *
   */
  echo(
    message: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Echo the given string.
   *
   * Since Redis v1.0.0
   *
   */
  echoBuffer(
    message: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Execute a Lua script server side.
   *
   * Complexity: Depends on the script that is executed.
   *
   * Since Redis v2.6.0
   *
   */
  eval(...args: any[]): Promise<any>;
  /**
   * Execute a Lua script server side.
   *
   * Complexity: Depends on the script that is executed.
   *
   * Since Redis v2.6.0
   *
   */
  evalBuffer(...args: any[]): Promise<any>;
  /**
   * Execute a Lua script server side.
   *
   * Complexity: Depends on the script that is executed.
   *
   * Since Redis v2.6.0
   *
   */
  evalsha(...args: any[]): Promise<any>;
  /**
   * Execute a Lua script server side.
   *
   * Complexity: Depends on the script that is executed.
   *
   * Since Redis v2.6.0
   *
   */
  evalshaBuffer(...args: any[]): Promise<any>;
  /**
   * Execute all commands issued after MULTI.
   *
   * Since Redis v1.2.0
   *
   */
  exec(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Execute all commands issued after MULTI.
   *
   * Since Redis v1.2.0
   *
   */
  execBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Determine if a key exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  exists(...args: any[]): Promise<any>;
  /**
   * Determine if a key exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  existsBuffer(...args: any[]): Promise<any>;
  /**
   * Set a key's time to live in seconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  expire(
    key: CommandKey,
    seconds: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set a key's time to live in seconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  expireBuffer(
    key: CommandKey,
    seconds: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the expiration for a key as a UNIX timestamp.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  expireat(...args: any[]): Promise<any>;
  /**
   * Set the expiration for a key as a UNIX timestamp.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  expireatBuffer(...args: any[]): Promise<any>;
  /**
   * Remove all keys from all databases.
   *
   * Since Redis v1.0.0
   *
   */
  flushall(async: "ASYNC", callback?: CallbackFunction<any>): Promise<any>;

  flushall(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove all keys from all databases.
   *
   * Since Redis v1.0.0
   *
   */
  flushallBuffer(
    async: "ASYNC",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  flushallBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove all keys from the current database.
   *
   * Since Redis v1.0.0
   *
   */
  flushdb(async: "ASYNC", callback?: CallbackFunction<any>): Promise<any>;

  flushdb(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove all keys from the current database.
   *
   * Since Redis v1.0.0
   *
   */
  flushdbBuffer(async: "ASYNC", callback?: CallbackFunction<any>): Promise<any>;

  flushdbBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Add one or more geospatial items in the geospatial index represented using a sorted set.
   *
   * Complexity: O(log(N)) for each item added, where N is the number of elements in the sorted set.
   *
   * Since Redis v3.2.0
   *
   */
  geoadd(...args: any[]): Promise<any>;
  /**
   * Add one or more geospatial items in the geospatial index represented using a sorted set.
   *
   * Complexity: O(log(N)) for each item added, where N is the number of elements in the sorted set.
   *
   * Since Redis v3.2.0
   *
   */
  geoaddBuffer(...args: any[]): Promise<any>;
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
    member2: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  geodist(
    key: CommandKey,
    member1: string | Buffer,
    member2: string | Buffer,
    unit: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Returns the distance between two members of a geospatial index.
   *
   * Complexity: O(log(N))
   *
   * Since Redis v3.2.0
   *
   */
  geodistBuffer(
    key: CommandKey,
    member1: string | Buffer,
    member2: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  geodistBuffer(
    key: CommandKey,
    member1: string | Buffer,
    member2: string | Buffer,
    unit: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Returns members of a geospatial index as standard geohash strings.
   *
   * Complexity: O(log(N)) for each member requested, where N is the number of elements in the sorted set.
   *
   * Since Redis v3.2.0
   *
   */
  geohash(...args: any[]): Promise<any>;
  /**
   * Returns members of a geospatial index as standard geohash strings.
   *
   * Complexity: O(log(N)) for each member requested, where N is the number of elements in the sorted set.
   *
   * Since Redis v3.2.0
   *
   */
  geohashBuffer(...args: any[]): Promise<any>;
  /**
   * Returns longitude and latitude of members of a geospatial index.
   *
   * Complexity: O(log(N)) for each member requested, where N is the number of elements in the sorted set.
   *
   * Since Redis v3.2.0
   *
   */
  geopos(...args: any[]): Promise<any>;
  /**
   * Returns longitude and latitude of members of a geospatial index.
   *
   * Complexity: O(log(N)) for each member requested, where N is the number of elements in the sorted set.
   *
   * Since Redis v3.2.0
   *
   */
  geoposBuffer(...args: any[]): Promise<any>;
  /**
   * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point.
   *
   * Complexity: O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index.
   *
   * Since Redis v3.2.0
   *
   */
  georadius(...args: any[]): Promise<any>;
  /**
   * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point.
   *
   * Complexity: O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index.
   *
   * Since Redis v3.2.0
   *
   */
  georadiusBuffer(...args: any[]): Promise<any>;
  georadiusRo(...args: any[]): Promise<any>;
  georadiusRoBuffer(...args: any[]): Promise<any>;
  /**
   * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member.
   *
   * Complexity: O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index.
   *
   * Since Redis v3.2.0
   *
   */
  georadiusbymember(...args: any[]): Promise<any>;
  /**
   * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member.
   *
   * Complexity: O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index.
   *
   * Since Redis v3.2.0
   *
   */
  georadiusbymemberBuffer(...args: any[]): Promise<any>;
  georadiusbymemberRo(...args: any[]): Promise<any>;
  georadiusbymemberRoBuffer(...args: any[]): Promise<any>;
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
  get(key: CommandKey, callback?: CallbackFunction<string>): Promise<string>;
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
  getBuffer(
    key: CommandKey,
    callback?: CallbackFunction<Buffer>
  ): Promise<Buffer>;
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
  getbit(
    key: CommandKey,
    offset: number,
    callback?: CallbackFunction<number>
  ): Promise<number>;
  /**
   * Get a substring of the string stored at a key.
   *
   * Complexity: O(N) where N is the length of the returned string. The complexity is ultimately determined by the returned length, but because creating a substring from an existing string is very cheap, it can be considered O(1) for small strings.
   *
   * Since Redis v2.4.0
   *
   */
  getrange(
    key: CommandKey,
    start: number,
    end: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get a substring of the string stored at a key.
   *
   * Complexity: O(N) where N is the length of the returned string. The complexity is ultimately determined by the returned length, but because creating a substring from an existing string is very cheap, it can be considered O(1) for small strings.
   *
   * Since Redis v2.4.0
   *
   */
  getrangeBuffer(
    key: CommandKey,
    start: number,
    end: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the string value of a key and return its old value.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  getset(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the string value of a key and return its old value.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  getsetBuffer(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Delete one or more hash fields.
   *
   * Complexity: O(N) where N is the number of fields to be removed.
   *
   * Since Redis v2.0.0
   *
   */
  hdel(...args: any[]): Promise<any>;
  /**
   * Delete one or more hash fields.
   *
   * Complexity: O(N) where N is the number of fields to be removed.
   *
   * Since Redis v2.0.0
   *
   */
  hdelBuffer(...args: any[]): Promise<any>;
  /**
   * Determine if a hash field exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hexists(
    key: CommandKey,
    field: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Determine if a hash field exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hexistsBuffer(
    key: CommandKey,
    field: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the value of a hash field.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hget(
    key: CommandKey,
    field: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the value of a hash field.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hgetBuffer(
    key: CommandKey,
    field: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get all the fields and values in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hgetall(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get all the fields and values in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hgetallBuffer(
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
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
    increment: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Increment the integer value of a hash field by the given number.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hincrbyBuffer(
    key: CommandKey,
    field: string | Buffer,
    increment: number,
    callback?: CallbackFunction<any>
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
    increment: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Increment the float value of a hash field by the given amount.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  hincrbyfloatBuffer(
    key: CommandKey,
    field: string | Buffer,
    increment: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get all the fields in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hkeys(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get all the fields in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hkeysBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the number of fields in a hash.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hlen(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the number of fields in a hash.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hlenBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the values of all the given hash fields.
   *
   * Complexity: O(N) where N is the number of fields being requested.
   *
   * Since Redis v2.0.0
   *
   */
  hmget(...args: any[]): Promise<any>;
  /**
   * Get the values of all the given hash fields.
   *
   * Complexity: O(N) where N is the number of fields being requested.
   *
   * Since Redis v2.0.0
   *
   */
  hmgetBuffer(...args: any[]): Promise<any>;
  /**
   * Set multiple hash fields to multiple values.
   *
   * Complexity: O(N) where N is the number of fields being set.
   *
   * Since Redis v2.0.0
   *
   */
  hmset(...args: any[]): Promise<any>;
  /**
   * Set multiple hash fields to multiple values.
   *
   * Complexity: O(N) where N is the number of fields being set.
   *
   * Since Redis v2.0.0
   *
   */
  hmsetBuffer(...args: any[]): Promise<any>;
  host(...args: any[]): Promise<any>;
  hostBuffer(...args: any[]): Promise<any>;
  /**
   * Incrementally iterate hash fields and associated values.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..
   *
   * Since Redis v2.8.0
   *
   */
  hscan(
    key: CommandKey,
    cursor: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  hscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  hscan(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  hscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Incrementally iterate hash fields and associated values.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..
   *
   * Since Redis v2.8.0
   *
   */
  hscanBuffer(
    key: CommandKey,
    cursor: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  hscanBuffer(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  hscanBuffer(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  hscanBuffer(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
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
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the string value of a hash field.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hsetBuffer(
    key: CommandKey,
    field: string | Buffer,
    value: string | Buffer,
    callback?: CallbackFunction<any>
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
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the value of a hash field, only if the field does not exist.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  hsetnxBuffer(
    key: CommandKey,
    field: string | Buffer,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the length of the value of a hash field.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2.0
   *
   */
  hstrlen(
    key: CommandKey,
    field: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the length of the value of a hash field.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2.0
   *
   */
  hstrlenBuffer(
    key: CommandKey,
    field: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get all the values in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hvals(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get all the values in a hash.
   *
   * Complexity: O(N) where N is the size of the hash.
   *
   * Since Redis v2.0.0
   *
   */
  hvalsBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Increment the integer value of a key by one.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   * @returns The value of key after the increment.
   *
   */
  incr(key: CommandKey, callback?: CallbackFunction<number>): Promise<number>;
  /**
   * Increment the integer value of a key by the given amount.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  incrby(
    key: CommandKey,
    increment: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Increment the integer value of a key by the given amount.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  incrbyBuffer(
    key: CommandKey,
    increment: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Increment the float value of a key by the given amount.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  incrbyfloat(
    key: CommandKey,
    increment: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Increment the float value of a key by the given amount.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  incrbyfloatBuffer(
    key: CommandKey,
    increment: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get information and statistics about the server.
   *
   * Since Redis v1.0.0
   *
   */
  info(
    section: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  info(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get information and statistics about the server.
   *
   * Since Redis v1.0.0
   *
   */
  infoBuffer(
    section: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  infoBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Find all keys matching the given pattern.
   *
   * Complexity: O(N) with N being the number of keys in the database, under the assumption that the key names in the database and the given pattern have limited length.
   *
   * Since Redis v1.0.0
   *
   */
  keys(pattern: CommandPattern, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Find all keys matching the given pattern.
   *
   * Complexity: O(N) with N being the number of keys in the database, under the assumption that the key names in the database and the given pattern have limited length.
   *
   * Since Redis v1.0.0
   *
   */
  keysBuffer(
    pattern: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the UNIX time stamp of the last successful save to disk.
   *
   * Since Redis v1.0.0
   *
   */
  lastsave(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the UNIX time stamp of the last successful save to disk.
   *
   * Since Redis v1.0.0
   *
   */
  lastsaveBuffer(callback?: CallbackFunction<any>): Promise<any>;
  latency(...args: any[]): Promise<any>;
  latencyBuffer(...args: any[]): Promise<any>;
  /**
   * Get an element from a list by its index.
   *
   * Complexity: O(N) where N is the number of elements to traverse to get to the element at index. This makes asking for the first or the last element of the list O(1).
   *
   * Since Redis v1.0.0
   *
   */
  lindex(
    key: CommandKey,
    index: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get an element from a list by its index.
   *
   * Complexity: O(N) where N is the number of elements to traverse to get to the element at index. This makes asking for the first or the last element of the list O(1).
   *
   * Since Redis v1.0.0
   *
   */
  lindexBuffer(
    key: CommandKey,
    index: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
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
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Insert an element before or after another element in a list.
   *
   * Complexity: O(N) where N is the number of elements to traverse before seeing the value pivot. This means that inserting somewhere on the left end on the list (head) can be considered O(1) and inserting somewhere on the right end (tail) is O(N).
   *
   * Since Redis v2.2.0
   *
   */
  linsertBuffer(
    key: CommandKey,
    where: "BEFORE" | "AFTER",
    pivot: string | Buffer,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the length of a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  llen(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the length of a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  llenBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  lolwut(...args: any[]): Promise<any>;
  lolwutBuffer(...args: any[]): Promise<any>;
  /**
   * Remove and get the first element in a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  lpop(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove and get the first element in a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  lpopBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
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
  lpush(...args: any[]): Promise<number>;
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
  lpushx(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<number>
  ): Promise<number>;
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
  lrange(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<string[]>
  ): Promise<string[]>;
  /**
   * Remove elements from a list.
   *
   * Complexity: O(N) where N is the length of the list.
   *
   * Since Redis v1.0.0
   *
   */
  lrem(
    key: CommandKey,
    count: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove elements from a list.
   *
   * Complexity: O(N) where N is the length of the list.
   *
   * Since Redis v1.0.0
   *
   */
  lremBuffer(
    key: CommandKey,
    count: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the value of an element in a list by its index.
   *
   * Complexity: O(N) where N is the length of the list. Setting either the first or the last element of the list is O(1).
   *
   * Since Redis v1.0.0
   *
   */
  lset(
    key: CommandKey,
    index: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the value of an element in a list by its index.
   *
   * Complexity: O(N) where N is the length of the list. Setting either the first or the last element of the list is O(1).
   *
   * Since Redis v1.0.0
   *
   */
  lsetBuffer(
    key: CommandKey,
    index: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Trim a list to the specified range.
   *
   * Complexity: O(N) where N is the number of elements to be removed by the operation.
   *
   * Since Redis v1.0.0
   *
   */
  ltrim(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Trim a list to the specified range.
   *
   * Complexity: O(N) where N is the number of elements to be removed by the operation.
   *
   * Since Redis v1.0.0
   *
   */
  ltrimBuffer(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Outputs memory problems report.
   *
   * Since Redis v4.0.0
   *
   */
  memory(doctor: "doctor", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Outputs memory problems report.
   *
   * Since Redis v4.0.0
   *
   */
  memoryBuffer(
    doctor: "doctor",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Show helpful text about the different subcommands.
   *
   * Since Redis v4.0.0
   *
   */
  memory(help: "help", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Show helpful text about the different subcommands.
   *
   * Since Redis v4.0.0
   *
   */
  memoryBuffer(help: "help", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Show allocator internal stats.
   *
   * Since Redis v4.0.0
   *
   */
  memory(
    mallocStats: "malloc-stats",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Show allocator internal stats.
   *
   * Since Redis v4.0.0
   *
   */
  memoryBuffer(
    mallocStats: "malloc-stats",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Ask the allocator to release memory.
   *
   * Since Redis v4.0.0
   *
   */
  memory(purge: "purge", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Ask the allocator to release memory.
   *
   * Since Redis v4.0.0
   *
   */
  memoryBuffer(purge: "purge", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Show memory usage details.
   *
   * Since Redis v4.0.0
   *
   */
  memory(stats: "stats", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Show memory usage details.
   *
   * Since Redis v4.0.0
   *
   */
  memoryBuffer(stats: "stats", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Estimate the memory usage of a key.
   *
   * Complexity: O(N) where N is the number of samples.
   *
   * Since Redis v4.0.0
   *
   */
  memory(
    usage: "usage",
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  memory(
    usage: "usage",
    key: CommandKey,
    samplesOption: "samples" | "SAMPLES",
    samplesKey: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Estimate the memory usage of a key.
   *
   * Complexity: O(N) where N is the number of samples.
   *
   * Since Redis v4.0.0
   *
   */
  memoryBuffer(
    usage: "usage",
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  memoryBuffer(
    usage: "usage",
    key: CommandKey,
    samplesOption: "samples" | "SAMPLES",
    samplesKey: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the values of all the given keys.
   *
   * Complexity: O(N) where N is the number of keys to retrieve.
   *
   * Since Redis v1.0.0
   *
   */
  mget(...args: any[]): Promise<any>;
  /**
   * Get the values of all the given keys.
   *
   * Complexity: O(N) where N is the number of keys to retrieve.
   *
   * Since Redis v1.0.0
   *
   */
  mgetBuffer(...args: any[]): Promise<any>;
  /**
   * Atomically transfer a key from a Redis instance to another one.
   *
   * Complexity: This command actually executes a DUMP+DEL in the source instance, and a RESTORE in the target instance. See the pages of these commands for time complexity. Also an O(N) data transfer between the two instances is performed.
   *
   * Since Redis v2.6.0
   *
   */
  migrate(...args: any[]): Promise<any>;
  /**
   * Atomically transfer a key from a Redis instance to another one.
   *
   * Complexity: This command actually executes a DUMP+DEL in the source instance, and a RESTORE in the target instance. See the pages of these commands for time complexity. Also an O(N) data transfer between the two instances is performed.
   *
   * Since Redis v2.6.0
   *
   */
  migrateBuffer(...args: any[]): Promise<any>;
  module(...args: any[]): Promise<any>;
  moduleBuffer(...args: any[]): Promise<any>;
  /**
   * Move a key to another database.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  move(
    key: CommandKey,
    db: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Move a key to another database.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  moveBuffer(
    key: CommandKey,
    db: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set multiple keys to multiple values.
   *
   * Complexity: O(N) where N is the number of keys to set.
   *
   * Since Redis v1.0.1
   *
   */
  mset(...args: any[]): Promise<any>;
  /**
   * Set multiple keys to multiple values.
   *
   * Complexity: O(N) where N is the number of keys to set.
   *
   * Since Redis v1.0.1
   *
   */
  msetBuffer(...args: any[]): Promise<any>;
  /**
   * Set multiple keys to multiple values, only if none of the keys exist.
   *
   * Complexity: O(N) where N is the number of keys to set.
   *
   * Since Redis v1.0.1
   *
   */
  msetnx(...args: any[]): Promise<any>;
  /**
   * Set multiple keys to multiple values, only if none of the keys exist.
   *
   * Complexity: O(N) where N is the number of keys to set.
   *
   * Since Redis v1.0.1
   *
   */
  msetnxBuffer(...args: any[]): Promise<any>;
  /**
   * Mark the start of a transaction block.
   *
   * Since Redis v1.2.0
   *
   */
  multi(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Mark the start of a transaction block.
   *
   * Since Redis v1.2.0
   *
   */
  multiBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Inspect the internals of Redis objects.
   *
   * Complexity: O(1) for all the currently implemented subcommands.
   *
   * Since Redis v2.2.3
   *
   */
  object(
    subcommand: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  object(...args: any[]): Promise<any>;
  /**
   * Inspect the internals of Redis objects.
   *
   * Complexity: O(1) for all the currently implemented subcommands.
   *
   * Since Redis v2.2.3
   *
   */
  objectBuffer(
    subcommand: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  objectBuffer(...args: any[]): Promise<any>;
  /**
   * Remove the expiration from a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  persist(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove the expiration from a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  persistBuffer(
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set a key's time to live in milliseconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  pexpire(
    key: CommandKey,
    milliseconds: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set a key's time to live in milliseconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  pexpireBuffer(
    key: CommandKey,
    milliseconds: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the expiration for a key as a UNIX timestamp specified in milliseconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  pexpireat(...args: any[]): Promise<any>;
  /**
   * Set the expiration for a key as a UNIX timestamp specified in milliseconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  pexpireatBuffer(...args: any[]): Promise<any>;
  /**
   * Adds the specified elements to the specified HyperLogLog.
   *
   * Complexity: O(1) to add every element.
   *
   * Since Redis v2.8.9
   *
   */
  pfadd(...args: any[]): Promise<any>;
  /**
   * Adds the specified elements to the specified HyperLogLog.
   *
   * Complexity: O(1) to add every element.
   *
   * Since Redis v2.8.9
   *
   */
  pfaddBuffer(...args: any[]): Promise<any>;
  /**
   * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
   *
   * Complexity: O(1) with a very small average constant time when called with a single key. O(N) with N being the number of keys, and much bigger constant times, when called with multiple keys.
   *
   * Since Redis v2.8.9
   *
   */
  pfcount(...args: any[]): Promise<any>;
  /**
   * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
   *
   * Complexity: O(1) with a very small average constant time when called with a single key. O(N) with N being the number of keys, and much bigger constant times, when called with multiple keys.
   *
   * Since Redis v2.8.9
   *
   */
  pfcountBuffer(...args: any[]): Promise<any>;
  pfdebug(...args: any[]): Promise<any>;
  pfdebugBuffer(...args: any[]): Promise<any>;
  /**
   * Merge N different HyperLogLogs into a single one.
   *
   * Complexity: O(N) to merge N HyperLogLogs, but with high constant times.
   *
   * Since Redis v2.8.9
   *
   */
  pfmerge(...args: any[]): Promise<any>;
  /**
   * Merge N different HyperLogLogs into a single one.
   *
   * Complexity: O(N) to merge N HyperLogLogs, but with high constant times.
   *
   * Since Redis v2.8.9
   *
   */
  pfmergeBuffer(...args: any[]): Promise<any>;
  pfselftest(...args: any[]): Promise<any>;
  pfselftestBuffer(...args: any[]): Promise<any>;
  /**
   * Ping the server.
   *
   * Since Redis v1.0.0
   *
   */
  ping(
    message: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  ping(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Ping the server.
   *
   * Since Redis v1.0.0
   *
   */
  pingBuffer(
    message: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  pingBuffer(callback?: CallbackFunction<any>): Promise<any>;
  post(...args: any[]): Promise<any>;
  postBuffer(...args: any[]): Promise<any>;
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
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the value and expiration in milliseconds of a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  psetexBuffer(
    key: CommandKey,
    milliseconds: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Listen for messages published to channels matching the given patterns.
   *
   * Complexity: O(N) where N is the number of patterns the client is already subscribed to.
   *
   * Since Redis v2.0.0
   *
   */
  psubscribe(...args: any[]): Promise<any>;
  /**
   * Listen for messages published to channels matching the given patterns.
   *
   * Complexity: O(N) where N is the number of patterns the client is already subscribed to.
   *
   * Since Redis v2.0.0
   *
   */
  psubscribeBuffer(...args: any[]): Promise<any>;
  psync(...args: any[]): Promise<any>;
  psyncBuffer(...args: any[]): Promise<any>;
  /**
   * Get the time to live for a key in milliseconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  pttl(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the time to live for a key in milliseconds.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  pttlBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Post a message to a channel.
   *
   * Complexity: O(N+M) where N is the number of clients subscribed to the receiving channel and M is the total number of subscribed patterns (by any client).
   *
   * Since Redis v2.0.0
   *
   */
  publish(
    channel: string | Buffer,
    message: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Post a message to a channel.
   *
   * Complexity: O(N+M) where N is the number of clients subscribed to the receiving channel and M is the total number of subscribed patterns (by any client).
   *
   * Since Redis v2.0.0
   *
   */
  publishBuffer(
    channel: string | Buffer,
    message: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Inspect the state of the Pub/Sub subsystem.
   *
   * Complexity: O(N) for the CHANNELS subcommand, where N is the number of active channels, and assuming constant time pattern matching (relatively short channels and patterns). O(N) for the NUMSUB subcommand, where N is the number of requested channels. O(1) for the NUMPAT subcommand.
   *
   * Since Redis v2.8.0
   *
   */
  pubsub(
    subcommand: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  pubsub(...args: any[]): Promise<any>;
  /**
   * Inspect the state of the Pub/Sub subsystem.
   *
   * Complexity: O(N) for the CHANNELS subcommand, where N is the number of active channels, and assuming constant time pattern matching (relatively short channels and patterns). O(N) for the NUMSUB subcommand, where N is the number of requested channels. O(1) for the NUMPAT subcommand.
   *
   * Since Redis v2.8.0
   *
   */
  pubsubBuffer(
    subcommand: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  pubsubBuffer(...args: any[]): Promise<any>;
  /**
   * Stop listening for messages posted to channels matching the given patterns.
   *
   * Complexity: O(N+M) where N is the number of patterns the client is already subscribed and M is the number of total patterns subscribed in the system (by any client).
   *
   * Since Redis v2.0.0
   *
   */
  punsubscribe(...args: any[]): Promise<any>;

  punsubscribe(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Stop listening for messages posted to channels matching the given patterns.
   *
   * Complexity: O(N+M) where N is the number of patterns the client is already subscribed and M is the number of total patterns subscribed in the system (by any client).
   *
   * Since Redis v2.0.0
   *
   */
  punsubscribeBuffer(...args: any[]): Promise<any>;

  punsubscribeBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Close the connection.
   *
   * Since Redis v1.0.0
   *
   */
  quit(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Close the connection.
   *
   * Since Redis v1.0.0
   *
   */
  quitBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return a random key from the keyspace.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  randomkey(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return a random key from the keyspace.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  randomkeyBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Enables read queries for a connection to a cluster replica node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  readonly(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Enables read queries for a connection to a cluster replica node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  readonlyBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Disables read queries for a connection to a cluster replica node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  readwrite(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Disables read queries for a connection to a cluster replica node.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  readwriteBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Rename a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  rename(
    key: CommandKey,
    newkey: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Rename a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  renameBuffer(
    key: CommandKey,
    newkey: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Rename a key, only if the new key does not exist.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  renamenx(
    key: CommandKey,
    newkey: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Rename a key, only if the new key does not exist.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  renamenxBuffer(
    key: CommandKey,
    newkey: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  replconf(...args: any[]): Promise<any>;
  replconfBuffer(...args: any[]): Promise<any>;
  /**
   * Make the server a replica of another instance, or promote it as master.
   *
   * Since Redis v5.0.0
   *
   */
  replicaof(
    host: string | Buffer,
    port: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Make the server a replica of another instance, or promote it as master.
   *
   * Since Redis v5.0.0
   *
   */
  replicaofBuffer(
    host: string | Buffer,
    port: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Create a key using the provided serialized value, previously obtained using DUMP.
   *
   * Complexity: O(1) to create the new key and additional O(N*M) to reconstruct the serialized value, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1). However for sorted set values the complexity is O(N*M*log(N)) because inserting values into sorted sets is O(log(N)).
   *
   * Since Redis v2.6.0
   *
   */
  restore(...args: any[]): Promise<any>;
  /**
   * Create a key using the provided serialized value, previously obtained using DUMP.
   *
   * Complexity: O(1) to create the new key and additional O(N*M) to reconstruct the serialized value, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1). However for sorted set values the complexity is O(N*M*log(N)) because inserting values into sorted sets is O(log(N)).
   *
   * Since Redis v2.6.0
   *
   */
  restoreBuffer(...args: any[]): Promise<any>;
  restoreAsking(...args: any[]): Promise<any>;
  restoreAskingBuffer(...args: any[]): Promise<any>;
  /**
   * Return the role of the instance in the context of replication.
   *
   * Since Redis v2.8.12
   *
   */
  role(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return the role of the instance in the context of replication.
   *
   * Since Redis v2.8.12
   *
   */
  roleBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove and get the last element in a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  rpop(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove and get the last element in a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  rpopBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove the last element in a list, prepend it to another list and return it.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  rpoplpush(
    source: CommandKey,
    destination: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove the last element in a list, prepend it to another list and return it.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  rpoplpushBuffer(
    source: CommandKey,
    destination: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Append one or multiple values to a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  rpush(...args: any[]): Promise<any>;
  /**
   * Append one or multiple values to a list.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  rpushBuffer(...args: any[]): Promise<any>;
  /**
   * Append a value to a list, only if the list exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  rpushx(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Append a value to a list, only if the list exists.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  rpushxBuffer(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Add one or more members to a set.
   *
   * Complexity: O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.
   *
   * Since Redis v1.0.0
   *
   */
  sadd(...args: any[]): Promise<any>;
  /**
   * Add one or more members to a set.
   *
   * Complexity: O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.
   *
   * Since Redis v1.0.0
   *
   */
  saddBuffer(...args: any[]): Promise<any>;
  /**
   * Synchronously save the dataset to disk.
   *
   * Since Redis v1.0.0
   *
   */
  save(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Synchronously save the dataset to disk.
   *
   * Since Redis v1.0.0
   *
   */
  saveBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Incrementally iterate the keys space.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection.
   *
   * Since Redis v2.8.0
   *
   */
  scan(cursor: number, callback?: CallbackFunction<any>): Promise<any>;

  scan(
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  scan(
    cursor: number,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  scan(
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Incrementally iterate the keys space.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection.
   *
   * Since Redis v2.8.0
   *
   */
  scanBuffer(cursor: number, callback?: CallbackFunction<any>): Promise<any>;

  scanBuffer(
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  scanBuffer(
    cursor: number,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  scanBuffer(
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the number of members in a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  scard(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the number of members in a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  scardBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Set the debug mode for executed scripts.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2.0
   *
   */
  script(
    debug: "debug",
    mode: "YES" | "SYNC" | "NO",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the debug mode for executed scripts.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.2.0
   *
   */
  scriptBuffer(
    debug: "debug",
    mode: "YES" | "SYNC" | "NO",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Check existence of scripts in the script cache.
   *
   * Complexity: O(N) with N being the number of scripts to check (so checking a single script is an O(1) operation).
   *
   * Since Redis v2.6.0
   *
   */
  script(...args: any[]): Promise<any>;
  /**
   * Check existence of scripts in the script cache.
   *
   * Complexity: O(N) with N being the number of scripts to check (so checking a single script is an O(1) operation).
   *
   * Since Redis v2.6.0
   *
   */
  scriptBuffer(...args: any[]): Promise<any>;
  /**
   * Remove all the scripts from the script cache.
   *
   * Complexity: O(N) with N being the number of scripts in cache.
   *
   * Since Redis v2.6.0
   *
   */
  script(flush: "flush", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Remove all the scripts from the script cache.
   *
   * Complexity: O(N) with N being the number of scripts in cache.
   *
   * Since Redis v2.6.0
   *
   */
  scriptBuffer(flush: "flush", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Kill the script currently in execution.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  script(kill: "kill", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Kill the script currently in execution.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  scriptBuffer(kill: "kill", callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Load the specified Lua script into the script cache.
   *
   * Complexity: O(N) with N being the length in bytes of the script body.
   *
   * Since Redis v2.6.0
   *
   */
  script(
    load: "load",
    script: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Load the specified Lua script into the script cache.
   *
   * Complexity: O(N) with N being the length in bytes of the script body.
   *
   * Since Redis v2.6.0
   *
   */
  scriptBuffer(
    load: "load",
    script: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Subtract multiple sets.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sdiff(...args: any[]): Promise<any>;
  /**
   * Subtract multiple sets.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sdiffBuffer(...args: any[]): Promise<any>;
  /**
   * Subtract multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sdiffstore(...args: any[]): Promise<any>;
  /**
   * Subtract multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sdiffstoreBuffer(...args: any[]): Promise<any>;
  /**
   * Change the selected database for the current connection.
   *
   * Since Redis v1.0.0
   *
   */
  select(index: number, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Change the selected database for the current connection.
   *
   * Since Redis v1.0.0
   *
   */
  selectBuffer(index: number, callback?: CallbackFunction<any>): Promise<any>;
  sentinel(...args: any[]): Promise<any>;
  sentinelBuffer(...args: any[]): Promise<any>;
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
  set(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<"OK">
  ): Promise<"OK">;

  set(
    key: CommandKey,
    value: string | Buffer,
    expirationOption: "expiration" | "EXPIRATION",
    expirationKey: "EX seconds" | "PX milliseconds",
    callback?: CallbackFunction<"OK">
  ): Promise<"OK">;

  set(
    key: CommandKey,
    value: string | Buffer,
    condition: "NX" | "XX",
    callback?: CallbackFunction<"OK">
  ): Promise<"OK">;

  set(
    key: CommandKey,
    value: string | Buffer,
    expirationOption: "expiration" | "EXPIRATION",
    expirationKey: "EX seconds" | "PX milliseconds",
    condition: "NX" | "XX",
    callback?: CallbackFunction<"OK">
  ): Promise<"OK">;
  /**
   * Sets or clears the bit at offset in the string value stored at key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  setbit(
    key: CommandKey,
    offset: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Sets or clears the bit at offset in the string value stored at key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  setbitBuffer(
    key: CommandKey,
    offset: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the value and expiration of a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  setex(
    key: CommandKey,
    seconds: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the value and expiration of a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.0.0
   *
   */
  setexBuffer(
    key: CommandKey,
    seconds: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the value of a key, only if the key does not exist.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  setnx(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Set the value of a key, only if the key does not exist.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  setnxBuffer(
    key: CommandKey,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
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
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Overwrite part of a string at key starting at the specified offset.
   *
   * Complexity: O(1), not counting the time taken to copy the new string in place. Usually, this string is very small so the amortized complexity is O(1). Otherwise, complexity is O(M) with M being the length of the value argument.
   *
   * Since Redis v2.2.0
   *
   */
  setrangeBuffer(
    key: CommandKey,
    offset: number,
    value: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Synchronously save the dataset to disk and then shut down the server.
   *
   * Since Redis v1.0.0
   *
   */
  shutdown(
    saveMode: "NOSAVE" | "SAVE",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  shutdown(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Synchronously save the dataset to disk and then shut down the server.
   *
   * Since Redis v1.0.0
   *
   */
  shutdownBuffer(
    saveMode: "NOSAVE" | "SAVE",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  shutdownBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Intersect multiple sets.
   *
   * Complexity: O(N*M) worst case where N is the cardinality of the smallest set and M is the number of sets.
   *
   * Since Redis v1.0.0
   *
   */
  sinter(...args: any[]): Promise<any>;
  /**
   * Intersect multiple sets.
   *
   * Complexity: O(N*M) worst case where N is the cardinality of the smallest set and M is the number of sets.
   *
   * Since Redis v1.0.0
   *
   */
  sinterBuffer(...args: any[]): Promise<any>;
  /**
   * Intersect multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N*M) worst case where N is the cardinality of the smallest set and M is the number of sets.
   *
   * Since Redis v1.0.0
   *
   */
  sinterstore(...args: any[]): Promise<any>;
  /**
   * Intersect multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N*M) worst case where N is the cardinality of the smallest set and M is the number of sets.
   *
   * Since Redis v1.0.0
   *
   */
  sinterstoreBuffer(...args: any[]): Promise<any>;
  /**
   * Determine if a given value is a member of a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  sismember(
    key: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Determine if a given value is a member of a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  sismemberBuffer(
    key: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
   *
   * Since Redis v1.0.0
   *
   */
  slaveof(
    host: string | Buffer,
    port: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
   *
   * Since Redis v1.0.0
   *
   */
  slaveofBuffer(
    host: string | Buffer,
    port: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Manages the Redis slow queries log.
   *
   * Since Redis v2.2.12
   *
   */
  slowlog(
    subcommand: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  slowlog(
    subcommand: string | Buffer,
    argument: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Manages the Redis slow queries log.
   *
   * Since Redis v2.2.12
   *
   */
  slowlogBuffer(
    subcommand: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  slowlogBuffer(
    subcommand: string | Buffer,
    argument: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get all the members in a set.
   *
   * Complexity: O(N) where N is the set cardinality.
   *
   * Since Redis v1.0.0
   *
   */
  smembers(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get all the members in a set.
   *
   * Complexity: O(N) where N is the set cardinality.
   *
   * Since Redis v1.0.0
   *
   */
  smembersBuffer(
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;
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
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Move a member from one set to another.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  smoveBuffer(
    source: CommandKey,
    destination: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Sort the elements in a list, set or sorted set.
   *
   * Complexity: O(N+M*log(M)) where N is the number of elements in the list or set to sort, and M the number of returned elements. When the elements are not sorted, complexity is currently O(N) as there is a copy step that will be avoided in next releases.
   *
   * Since Redis v1.0.0
   *
   */
  sort(...args: any[]): Promise<any>;
  /**
   * Sort the elements in a list, set or sorted set.
   *
   * Complexity: O(N+M*log(M)) where N is the number of elements in the list or set to sort, and M the number of returned elements. When the elements are not sorted, complexity is currently O(N) as there is a copy step that will be avoided in next releases.
   *
   * Since Redis v1.0.0
   *
   */
  sortBuffer(...args: any[]): Promise<any>;
  /**
   * Remove and return one or multiple random members from a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  spop(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;

  spop(
    key: CommandKey,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove and return one or multiple random members from a set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  spopBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;

  spopBuffer(
    key: CommandKey,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get one or multiple random members from a set.
   *
   * Complexity: Without the count argument O(1), otherwise O(N) where N is the absolute value of the passed count.
   *
   * Since Redis v1.0.0
   *
   */
  srandmember(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;

  srandmember(
    key: CommandKey,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get one or multiple random members from a set.
   *
   * Complexity: Without the count argument O(1), otherwise O(N) where N is the absolute value of the passed count.
   *
   * Since Redis v1.0.0
   *
   */
  srandmemberBuffer(
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  srandmemberBuffer(
    key: CommandKey,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove one or more members from a set.
   *
   * Complexity: O(N) where N is the number of members to be removed.
   *
   * Since Redis v1.0.0
   *
   */
  srem(...args: any[]): Promise<any>;
  /**
   * Remove one or more members from a set.
   *
   * Complexity: O(N) where N is the number of members to be removed.
   *
   * Since Redis v1.0.0
   *
   */
  sremBuffer(...args: any[]): Promise<any>;
  /**
   * Incrementally iterate Set elements.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..
   *
   * Since Redis v2.8.0
   *
   */
  sscan(
    key: CommandKey,
    cursor: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  sscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  sscan(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  sscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Incrementally iterate Set elements.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..
   *
   * Since Redis v2.8.0
   *
   */
  sscanBuffer(
    key: CommandKey,
    cursor: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  sscanBuffer(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  sscanBuffer(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  sscanBuffer(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the length of the value stored in a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  strlen(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the length of the value stored in a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  strlenBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Listen for messages published to the given channels.
   *
   * Complexity: O(N) where N is the number of channels to subscribe to.
   *
   * Since Redis v2.0.0
   *
   */
  subscribe(...args: any[]): Promise<any>;
  /**
   * Listen for messages published to the given channels.
   *
   * Complexity: O(N) where N is the number of channels to subscribe to.
   *
   * Since Redis v2.0.0
   *
   */
  subscribeBuffer(...args: any[]): Promise<any>;
  substr(...args: any[]): Promise<any>;
  substrBuffer(...args: any[]): Promise<any>;
  /**
   * Add multiple sets.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sunion(...args: any[]): Promise<any>;
  /**
   * Add multiple sets.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sunionBuffer(...args: any[]): Promise<any>;
  /**
   * Add multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sunionstore(...args: any[]): Promise<any>;
  /**
   * Add multiple sets and store the resulting set in a key.
   *
   * Complexity: O(N) where N is the total number of elements in all given sets.
   *
   * Since Redis v1.0.0
   *
   */
  sunionstoreBuffer(...args: any[]): Promise<any>;
  /**
   * Swaps two Redis databases.
   *
   * Since Redis v4.0.0
   *
   */
  swapdb(
    index: number,
    index1: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Swaps two Redis databases.
   *
   * Since Redis v4.0.0
   *
   */
  swapdbBuffer(
    index: number,
    index1: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Internal command used for replication.
   *
   * Since Redis v1.0.0
   *
   */
  sync(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Internal command used for replication.
   *
   * Since Redis v1.0.0
   *
   */
  syncBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return the current server time.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  time(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return the current server time.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.6.0
   *
   */
  timeBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Alters the last access time of a key(s). Returns the number of existing keys specified.
   *
   * Complexity: O(N) where N is the number of keys that will be touched.
   *
   * Since Redis v3.2.1
   *
   */
  touch(...args: any[]): Promise<any>;
  /**
   * Alters the last access time of a key(s). Returns the number of existing keys specified.
   *
   * Complexity: O(N) where N is the number of keys that will be touched.
   *
   * Since Redis v3.2.1
   *
   */
  touchBuffer(...args: any[]): Promise<any>;
  /**
   * Get the time to live for a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  ttl(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the time to live for a key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  ttlBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Determine the type stored at key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  type(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Determine the type stored at key.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.0.0
   *
   */
  typeBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
   *
   * Complexity: O(1) for each key removed regardless of its size. Then the command does O(N) work in a different thread in order to reclaim memory, where N is the number of allocations the deleted objects where composed of.
   *
   * Since Redis v4.0.0
   *
   */
  unlink(...args: any[]): Promise<any>;
  /**
   * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
   *
   * Complexity: O(1) for each key removed regardless of its size. Then the command does O(N) work in a different thread in order to reclaim memory, where N is the number of allocations the deleted objects where composed of.
   *
   * Since Redis v4.0.0
   *
   */
  unlinkBuffer(...args: any[]): Promise<any>;
  /**
   * Stop listening for messages posted to the given channels.
   *
   * Complexity: O(N) where N is the number of clients already subscribed to a channel.
   *
   * Since Redis v2.0.0
   *
   */
  unsubscribe(...args: any[]): Promise<any>;

  unsubscribe(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Stop listening for messages posted to the given channels.
   *
   * Complexity: O(N) where N is the number of clients already subscribed to a channel.
   *
   * Since Redis v2.0.0
   *
   */
  unsubscribeBuffer(...args: any[]): Promise<any>;

  unsubscribeBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Forget about all watched keys.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  unwatch(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Forget about all watched keys.
   *
   * Complexity: O(1)
   *
   * Since Redis v2.2.0
   *
   */
  unwatchBuffer(callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Wait for the synchronous replication of all the write commands sent in the context of the current connection.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  wait(
    numreplicas: number,
    timeout: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Wait for the synchronous replication of all the write commands sent in the context of the current connection.
   *
   * Complexity: O(1)
   *
   * Since Redis v3.0.0
   *
   */
  waitBuffer(
    numreplicas: number,
    timeout: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Watch the given keys to determine execution of the MULTI/EXEC block.
   *
   * Complexity: O(1) for every key.
   *
   * Since Redis v2.2.0
   *
   */
  watch(...args: any[]): Promise<any>;
  /**
   * Watch the given keys to determine execution of the MULTI/EXEC block.
   *
   * Complexity: O(1) for every key.
   *
   * Since Redis v2.2.0
   *
   */
  watchBuffer(...args: any[]): Promise<any>;
  /**
   * Marks a pending message as correctly processed, effectively removing it from the pending entries list of the consumer group. Return value of the command is the number of messages successfully acknowledged, that is, the IDs we were actually able to resolve in the PEL.
   *
   * Complexity: O(1) for each message ID processed.
   *
   * Since Redis v5.0.0
   *
   */
  xack(...args: any[]): Promise<any>;
  /**
   * Marks a pending message as correctly processed, effectively removing it from the pending entries list of the consumer group. Return value of the command is the number of messages successfully acknowledged, that is, the IDs we were actually able to resolve in the PEL.
   *
   * Complexity: O(1) for each message ID processed.
   *
   * Since Redis v5.0.0
   *
   */
  xackBuffer(...args: any[]): Promise<any>;
  /**
   * Appends a new entry to a stream.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   */
  xadd(...args: any[]): Promise<any>;
  /**
   * Appends a new entry to a stream.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   */
  xaddBuffer(...args: any[]): Promise<any>;
  /**
   * Changes (or acquires) ownership of a message in a consumer group, as if the message was delivered to the specified consumer.
   *
   * Complexity: O(log N) with N being the number of messages in the PEL of the consumer group.
   *
   * Since Redis v5.0.0
   *
   */
  xclaim(...args: any[]): Promise<any>;
  /**
   * Changes (or acquires) ownership of a message in a consumer group, as if the message was delivered to the specified consumer.
   *
   * Complexity: O(log N) with N being the number of messages in the PEL of the consumer group.
   *
   * Since Redis v5.0.0
   *
   */
  xclaimBuffer(...args: any[]): Promise<any>;
  /**
   * Removes the specified entries from the stream. Returns the number of items actually deleted, that may be different from the number of IDs passed in case certain IDs do not exist.
   *
   * Complexity: O(1) for each single item to delete in the stream, regardless of the stream size.
   *
   * Since Redis v5.0.0
   *
   */
  xdel(...args: any[]): Promise<any>;
  /**
   * Removes the specified entries from the stream. Returns the number of items actually deleted, that may be different from the number of IDs passed in case certain IDs do not exist.
   *
   * Complexity: O(1) for each single item to delete in the stream, regardless of the stream size.
   *
   * Since Redis v5.0.0
   *
   */
  xdelBuffer(...args: any[]): Promise<any>;
  /**
   * Create, destroy, and manage consumer groups.
   *
   * Complexity: O(1) for all the subcommands, with the exception of the DESTROY subcommand which takes an additional O(M) time in order to delete the M entries inside the consumer group pending entries list (PEL).
   *
   * Since Redis v5.0.0
   *
   */
  xgroup(...args: any[]): Promise<any>;
  /**
   * Create, destroy, and manage consumer groups.
   *
   * Complexity: O(1) for all the subcommands, with the exception of the DESTROY subcommand which takes an additional O(M) time in order to delete the M entries inside the consumer group pending entries list (PEL).
   *
   * Since Redis v5.0.0
   *
   */
  xgroupBuffer(...args: any[]): Promise<any>;
  /**
   * Get information on streams and consumer groups.
   *
   * Complexity: O(N) with N being the number of returned items for the subcommands CONSUMERS and GROUPS. The STREAM subcommand is O(log N) with N being the number of items in the stream.
   *
   * Since Redis v5.0.0
   *
   */
  xinfo(...args: any[]): Promise<any>;
  /**
   * Get information on streams and consumer groups.
   *
   * Complexity: O(N) with N being the number of returned items for the subcommands CONSUMERS and GROUPS. The STREAM subcommand is O(log N) with N being the number of items in the stream.
   *
   * Since Redis v5.0.0
   *
   */
  xinfoBuffer(...args: any[]): Promise<any>;
  /**
   * Return the number of entires in a stream.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   */
  xlen(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return the number of entires in a stream.
   *
   * Complexity: O(1)
   *
   * Since Redis v5.0.0
   *
   */
  xlenBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.
   *
   * Complexity: O(N) with N being the number of elements returned, so asking for a small fixed number of entries per call is O(1). When the command returns just the summary it runs in O(1) time assuming the list of consumers is small, otherwise there is additional O(N) time needed to iterate every consumer.
   *
   * Since Redis v5.0.0
   *
   */
  xpending(
    key: CommandKey,
    group: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xpending(
    key: CommandKey,
    group: string | Buffer,
    start: string | Buffer,
    end: string | Buffer,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xpending(
    key: CommandKey,
    group: string | Buffer,
    consumer: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xpending(
    key: CommandKey,
    group: string | Buffer,
    start: string | Buffer,
    end: string | Buffer,
    count: number,
    consumer: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.
   *
   * Complexity: O(N) with N being the number of elements returned, so asking for a small fixed number of entries per call is O(1). When the command returns just the summary it runs in O(1) time assuming the list of consumers is small, otherwise there is additional O(N) time needed to iterate every consumer.
   *
   * Since Redis v5.0.0
   *
   */
  xpendingBuffer(
    key: CommandKey,
    group: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xpendingBuffer(
    key: CommandKey,
    group: string | Buffer,
    start: string | Buffer,
    end: string | Buffer,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xpendingBuffer(
    key: CommandKey,
    group: string | Buffer,
    consumer: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xpendingBuffer(
    key: CommandKey,
    group: string | Buffer,
    start: string | Buffer,
    end: string | Buffer,
    count: number,
    consumer: string | Buffer,
    callback?: CallbackFunction<any>
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
    end: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xrange(
    key: CommandKey,
    start: string | Buffer,
    end: string | Buffer,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of elements in a stream, with IDs matching the specified IDs interval.
   *
   * Complexity: O(N) with N being the number of elements being returned. If N is constant (e.g. always asking for the first 10 elements with COUNT), you can consider it O(1).
   *
   * Since Redis v5.0.0
   *
   */
  xrangeBuffer(
    key: CommandKey,
    start: string | Buffer,
    end: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xrangeBuffer(
    key: CommandKey,
    start: string | Buffer,
    end: string | Buffer,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block.
   *
   * Complexity: For each stream mentioned: O(N) with N being the number of elements being returned, it menas that XREAD-ing with a fixed COUNT is O(1). Note that when the BLOCK option is used, XADD will pay O(M) time in order to serve the M clients blocked on the stream getting new data.
   *
   * Since Redis v5.0.0
   *
   */
  xread(...args: any[]): Promise<any>;
  /**
   * Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block.
   *
   * Complexity: For each stream mentioned: O(N) with N being the number of elements being returned, it menas that XREAD-ing with a fixed COUNT is O(1). Note that when the BLOCK option is used, XADD will pay O(M) time in order to serve the M clients blocked on the stream getting new data.
   *
   * Since Redis v5.0.0
   *
   */
  xreadBuffer(...args: any[]): Promise<any>;
  /**
   * Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block.
   *
   * Complexity: For each stream mentioned: O(M) with M being the number of elements returned. If M is constant (e.g. always asking for the first 10 elements with COUNT), you can consider it O(1). On the other side when XREADGROUP blocks, XADD will pay the O(N) time in order to serve the N clients blocked on the stream getting new data.
   *
   * Since Redis v5.0.0
   *
   */
  xreadgroup(...args: any[]): Promise<any>;
  /**
   * Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block.
   *
   * Complexity: For each stream mentioned: O(M) with M being the number of elements returned. If M is constant (e.g. always asking for the first 10 elements with COUNT), you can consider it O(1). On the other side when XREADGROUP blocks, XADD will pay the O(N) time in order to serve the N clients blocked on the stream getting new data.
   *
   * Since Redis v5.0.0
   *
   */
  xreadgroupBuffer(...args: any[]): Promise<any>;
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
    start: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xrevrange(
    key: CommandKey,
    end: string | Buffer,
    start: string | Buffer,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE.
   *
   * Complexity: O(N) with N being the number of elements returned. If N is constant (e.g. always asking for the first 10 elements with COUNT), you can consider it O(1).
   *
   * Since Redis v5.0.0
   *
   */
  xrevrangeBuffer(
    key: CommandKey,
    end: string | Buffer,
    start: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xrevrangeBuffer(
    key: CommandKey,
    end: string | Buffer,
    start: string | Buffer,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  xsetid(...args: any[]): Promise<any>;
  xsetidBuffer(...args: any[]): Promise<any>;
  /**
   * Trims the stream to (approximately if '~' is passed) a certain size.
   *
   * Complexity: O(N), with N being the number of evicted entries. Constant times are very small however, since entries are organized in macro nodes containing multiple entries that can be released with a single deallocation.
   *
   * Since Redis v5.0.0
   *
   */
  xtrim(
    key: CommandKey,
    strategy: "MAXLEN",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xtrim(
    key: CommandKey,
    strategy: "MAXLEN",
    approx: "~",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Trims the stream to (approximately if '~' is passed) a certain size.
   *
   * Complexity: O(N), with N being the number of evicted entries. Constant times are very small however, since entries are organized in macro nodes containing multiple entries that can be released with a single deallocation.
   *
   * Since Redis v5.0.0
   *
   */
  xtrimBuffer(
    key: CommandKey,
    strategy: "MAXLEN",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  xtrimBuffer(
    key: CommandKey,
    strategy: "MAXLEN",
    approx: "~",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Add one or more members to a sorted set, or update its score if it already exists.
   *
   * Complexity: O(log(N)) for each item added, where N is the number of elements in the sorted set.
   *
   * Since Redis v1.2.0
   *
   */
  zadd(...args: any[]): Promise<any>;
  /**
   * Add one or more members to a sorted set, or update its score if it already exists.
   *
   * Complexity: O(log(N)) for each item added, where N is the number of elements in the sorted set.
   *
   * Since Redis v1.2.0
   *
   */
  zaddBuffer(...args: any[]): Promise<any>;
  /**
   * Get the number of members in a sorted set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  zcard(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Get the number of members in a sorted set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  zcardBuffer(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;
  /**
   * Count the members in a sorted set with scores within the given values.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v2.0.0
   *
   */
  zcount(
    key: CommandKey,
    min: number,
    max: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Count the members in a sorted set with scores within the given values.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v2.0.0
   *
   */
  zcountBuffer(
    key: CommandKey,
    min: number,
    max: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
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
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Increment the score of a member in a sorted set.
   *
   * Complexity: O(log(N)) where N is the number of elements in the sorted set.
   *
   * Since Redis v1.2.0
   *
   */
  zincrbyBuffer(
    key: CommandKey,
    increment: number,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Intersect multiple sorted sets and store the resulting sorted set in a new key.
   *
   * Complexity: O(N*K)+O(M*log(M)) worst case with N being the smallest input sorted set, K being the number of input sorted sets and M being the number of elements in the resulting sorted set.
   *
   * Since Redis v2.0.0
   *
   */
  zinterstore(...args: any[]): Promise<any>;
  /**
   * Intersect multiple sorted sets and store the resulting sorted set in a new key.
   *
   * Complexity: O(N*K)+O(M*log(M)) worst case with N being the smallest input sorted set, K being the number of input sorted sets and M being the number of elements in the resulting sorted set.
   *
   * Since Redis v2.0.0
   *
   */
  zinterstoreBuffer(...args: any[]): Promise<any>;
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
    max: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Count the number of members in a sorted set between a given lexicographical range.
   *
   * Complexity: O(log(N)) with N being the number of elements in the sorted set.
   *
   * Since Redis v2.8.9
   *
   */
  zlexcountBuffer(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove and return members with the highest scores in a sorted set.
   *
   * Complexity: O(log(N)*M) with N being the number of elements in the sorted set, and M being the number of elements popped.
   *
   * Since Redis v5.0.0
   *
   */
  zpopmax(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;

  zpopmax(
    key: CommandKey,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove and return members with the highest scores in a sorted set.
   *
   * Complexity: O(log(N)*M) with N being the number of elements in the sorted set, and M being the number of elements popped.
   *
   * Since Redis v5.0.0
   *
   */
  zpopmaxBuffer(
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zpopmaxBuffer(
    key: CommandKey,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove and return members with the lowest scores in a sorted set.
   *
   * Complexity: O(log(N)*M) with N being the number of elements in the sorted set, and M being the number of elements popped.
   *
   * Since Redis v5.0.0
   *
   */
  zpopmin(key: CommandKey, callback?: CallbackFunction<any>): Promise<any>;

  zpopmin(
    key: CommandKey,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove and return members with the lowest scores in a sorted set.
   *
   * Complexity: O(log(N)*M) with N being the number of elements in the sorted set, and M being the number of elements popped.
   *
   * Since Redis v5.0.0
   *
   */
  zpopminBuffer(
    key: CommandKey,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zpopminBuffer(
    key: CommandKey,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by index.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
   *
   * Since Redis v1.2.0
   *
   */
  zrange(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrange(
    key: CommandKey,
    start: number,
    stop: number,
    withscores: "WITHSCORES",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by index.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
   *
   * Since Redis v1.2.0
   *
   */
  zrangeBuffer(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangeBuffer(
    key: CommandKey,
    start: number,
    stop: number,
    withscores: "WITHSCORES",
    callback?: CallbackFunction<any>
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
    max: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangebylex(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by lexicographical range.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v2.8.9
   *
   */
  zrangebylexBuffer(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangebylexBuffer(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by score.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v1.0.5
   *
   */
  zrangebyscore(
    key: CommandKey,
    min: number,
    max: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangebyscore(
    key: CommandKey,
    min: number,
    max: number,
    withscores: "WITHSCORES",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangebyscore(
    key: CommandKey,
    min: number,
    max: number,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangebyscore(
    key: CommandKey,
    min: number,
    max: number,
    withscores: "WITHSCORES",
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by score.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v1.0.5
   *
   */
  zrangebyscoreBuffer(
    key: CommandKey,
    min: number,
    max: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangebyscoreBuffer(
    key: CommandKey,
    min: number,
    max: number,
    withscores: "WITHSCORES",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangebyscoreBuffer(
    key: CommandKey,
    min: number,
    max: number,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrangebyscoreBuffer(
    key: CommandKey,
    min: number,
    max: number,
    withscores: "WITHSCORES",
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Determine the index of a member in a sorted set.
   *
   * Complexity: O(log(N))
   *
   * Since Redis v2.0.0
   *
   */
  zrank(
    key: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Determine the index of a member in a sorted set.
   *
   * Complexity: O(log(N))
   *
   * Since Redis v2.0.0
   *
   */
  zrankBuffer(
    key: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove one or more members from a sorted set.
   *
   * Complexity: O(M*log(N)) with N being the number of elements in the sorted set and M the number of elements to be removed.
   *
   * Since Redis v1.2.0
   *
   */
  zrem(...args: any[]): Promise<any>;
  /**
   * Remove one or more members from a sorted set.
   *
   * Complexity: O(M*log(N)) with N being the number of elements in the sorted set and M the number of elements to be removed.
   *
   * Since Redis v1.2.0
   *
   */
  zremBuffer(...args: any[]): Promise<any>;
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
    max: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove all members in a sorted set between the given lexicographical range.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.
   *
   * Since Redis v2.8.9
   *
   */
  zremrangebylexBuffer(
    key: CommandKey,
    min: string | Buffer,
    max: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove all members in a sorted set within the given indexes.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.
   *
   * Since Redis v2.0.0
   *
   */
  zremrangebyrank(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove all members in a sorted set within the given indexes.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.
   *
   * Since Redis v2.0.0
   *
   */
  zremrangebyrankBuffer(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove all members in a sorted set within the given scores.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.
   *
   * Since Redis v1.2.0
   *
   */
  zremrangebyscore(
    key: CommandKey,
    min: number,
    max: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Remove all members in a sorted set within the given scores.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.
   *
   * Since Redis v1.2.0
   *
   */
  zremrangebyscoreBuffer(
    key: CommandKey,
    min: number,
    max: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by index, with scores ordered from high to low.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
   *
   * Since Redis v1.2.0
   *
   */
  zrevrange(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrange(
    key: CommandKey,
    start: number,
    stop: number,
    withscores: "WITHSCORES",
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by index, with scores ordered from high to low.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.
   *
   * Since Redis v1.2.0
   *
   */
  zrevrangeBuffer(
    key: CommandKey,
    start: number,
    stop: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangeBuffer(
    key: CommandKey,
    start: number,
    stop: number,
    withscores: "WITHSCORES",
    callback?: CallbackFunction<any>
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
    min: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangebylex(
    key: CommandKey,
    max: string | Buffer,
    min: string | Buffer,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v2.8.9
   *
   */
  zrevrangebylexBuffer(
    key: CommandKey,
    max: string | Buffer,
    min: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangebylexBuffer(
    key: CommandKey,
    max: string | Buffer,
    min: string | Buffer,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by score, with scores ordered from high to low.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v2.2.0
   *
   */
  zrevrangebyscore(
    key: CommandKey,
    max: number,
    min: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangebyscore(
    key: CommandKey,
    max: number,
    min: number,
    withscores: "WITHSCORES",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangebyscore(
    key: CommandKey,
    max: number,
    min: number,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangebyscore(
    key: CommandKey,
    max: number,
    min: number,
    withscores: "WITHSCORES",
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Return a range of members in a sorted set, by score, with scores ordered from high to low.
   *
   * Complexity: O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements being returned. If M is constant (e.g. always asking for the first 10 elements with LIMIT), you can consider it O(log(N)).
   *
   * Since Redis v2.2.0
   *
   */
  zrevrangebyscoreBuffer(
    key: CommandKey,
    max: number,
    min: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangebyscoreBuffer(
    key: CommandKey,
    max: number,
    min: number,
    withscores: "WITHSCORES",
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangebyscoreBuffer(
    key: CommandKey,
    max: number,
    min: number,
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zrevrangebyscoreBuffer(
    key: CommandKey,
    max: number,
    min: number,
    withscores: "WITHSCORES",
    limitOption: "limit" | "LIMIT",
    offset: number,
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Determine the index of a member in a sorted set, with scores ordered from high to low.
   *
   * Complexity: O(log(N))
   *
   * Since Redis v2.0.0
   *
   */
  zrevrank(
    key: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Determine the index of a member in a sorted set, with scores ordered from high to low.
   *
   * Complexity: O(log(N))
   *
   * Since Redis v2.0.0
   *
   */
  zrevrankBuffer(
    key: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Incrementally iterate sorted sets elements and associated scores.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection.
   *
   * Since Redis v2.8.0
   *
   */
  zscan(
    key: CommandKey,
    cursor: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zscan(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zscan(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Incrementally iterate sorted sets elements and associated scores.
   *
   * Complexity: O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection.
   *
   * Since Redis v2.8.0
   *
   */
  zscanBuffer(
    key: CommandKey,
    cursor: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zscanBuffer(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zscanBuffer(
    key: CommandKey,
    cursor: number,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;

  zscanBuffer(
    key: CommandKey,
    cursor: number,
    matchOption: "match" | "MATCH",
    matchKey: CommandPattern,
    countOption: "count" | "COUNT",
    count: number,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the score associated with the given member in a sorted set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  zscore(
    key: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Get the score associated with the given member in a sorted set.
   *
   * Complexity: O(1)
   *
   * Since Redis v1.2.0
   *
   */
  zscoreBuffer(
    key: CommandKey,
    member: string | Buffer,
    callback?: CallbackFunction<any>
  ): Promise<any>;
  /**
   * Add multiple sorted sets and store the resulting sorted set in a new key.
   *
   * Complexity: O(N)+O(M log(M)) with N being the sum of the sizes of the input sorted sets, and M being the number of elements in the resulting sorted set.
   *
   * Since Redis v2.0.0
   *
   */
  zunionstore(...args: any[]): Promise<any>;
  /**
   * Add multiple sorted sets and store the resulting sorted set in a new key.
   *
   * Complexity: O(N)+O(M log(M)) with N being the sum of the sizes of the input sorted sets, and M being the number of elements in the resulting sorted set.
   *
   * Since Redis v2.0.0
   *
   */
  zunionstoreBuffer(...args: any[]): Promise<any>;
}
