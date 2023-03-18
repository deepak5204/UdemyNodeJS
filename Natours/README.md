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
