## Working with Default and Check
# AGGREGATION PIPELINE

### Aggregation
```bash
    Aggregation is a way of processing a large amount of documents in a collection by means of passing them through different stages.

    In other words, Aggregation is very similar to the find command, where you provide the criteria for your query in form of JSON documents.

    >> The key element in aggregation is called pipeline.

    >> It also helps us in perform few operations like min, max, sum etc.

```


### Aggregate Command
    db.collection.aggregate(pipeline)


### what is pipeline?
    > A pipeline is a sequence of data aggregation operations or stages.

    > A pipeline is an array.

    Stages is nothing but operations.


### Aggregation Pipelines
```
An aggregation pipeline consists of one or more stages that process documents:

Each stage performs an operation on the input documents. For example, a stage can filter documents, group documents, and calculate values.

The documents that are output from a stage are passed to the next stage.

An aggregation pipeline can return results for groups of documents. For example, return the total, average, maximum, and minimum values.

```


# AUTHENTICATION, AUTHORIZATION and SECURITY

```
**Authentication**, **Authorization** are all about signing up, logging in and accessing pages or routes that we grant them permission to do so.
```


```
In simple terms, authentication is the process of verifying who a user is, while authorization is the process of verifying what they have access to. Comparing these processes to a real-world example, when you go through security in an airport, you show your ID to authenticate your identity.

```


#### Use validator for password confirmation
``` 
This only works on CREATE and SAVE!!!!
```


### Install bcryptjs package for encryption 

```
Bcrypt turns a simple password into fixed-length characters called a hash. Before hashing a password, bcrypt applies a salt , a unique random string that makes the hash unpredictable. 

Command:  npm i bcryptjs

```
```node

    userSchema.pre('save', async function(next) {
        //only run this function if password was actually modified
        if(!this.isModified('password')){
            return next();
        }

        //Hash the password with cost of 12
        this.password = await bcrypt.hash(this.password, 12); //encrypt the password

        //delete passwordConfirm field 
        this.passwordConfirm = undefined; 
        next();
    });
```