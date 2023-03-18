## Working with Default and Check
## AGGREGATION PIPELINE

```bash
    Aggregation is a way of processing a large amount of documents in a collection by means of passing them through different stages.

    In other words, Aggregation is very similar to the find command, where you provide the criteria for your query in form of JSON documents.

    >> The key element in aggregation is called pipeline.

    >> It also helps us in perform few operations like min, max, sum etc.

```


### Aggregate Command
    db.collection.aggregate(pipeline)


## what is pipeline?
    > A pipeline is a sequence of data aggregation operations or stages.

    > A pipeline is an array.

    Stages is nothing but operations.