# RFC: Common input/output standard for temporal services
## Motivation
If we decide to have the input and output of our services be of the same format, then that will allow for the possibility to pass the same data between the services. A concrete example would be that a data-set can be checked for outliers, and then afterward prediction can be done on the dataset with this in mind on a different service.

## The objective
To create a format allowing for both multiple- and single graphs, alongside a description of each graph + the data-set as a whole. 

## The format
The proposed format is using JSON objects of the following format:
- Name of the dataset *(String)*
- All graphs *(Array of objects)*
    - Graph object(s):
        - Label/name of graph *(String)*
        - Data for graph *(Array of objects)*
            - Data-point object(s):
                - x *(floating point)*
                - y *(floating point)*

If desired then each "Data-point object" can be expanded with more data. Having an x- and y-value is, however, mandatory. 
A JSON object following this standard would look like this:
```json
{
  "dataSetName": "Name of dataset",
  "graphs": [
    {
      "label": "Name of graph",
      "data": [
        {
          "x": 2,
          "y": 38,
        },
        {
          "x": 2,
          "y": 38,
        }
      ]
    },
    {
      "label": "Name of graph",
      "data": [
        {
          "x": 5,
          "y": 33,
        },
        {
          "x": 42,
          "y": 83,
        },
        {
          "x": 56,
          "y": 153,
        }
      ]
    }
  ]
}
```
It is also possible to add aditional data to a "Data-point object" for example:
```json
{
  "x": 2,
  "y": 38,
  "outlier": true
}
```

## Integration with front end UI
If this is approved, then group SW602F20 will implement functionality in the frontend to convert from the proposed data standard into a data standard which can be represented visually using a framework like Chart.js.