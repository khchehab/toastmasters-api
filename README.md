# toastmasters-api
An API that retrieves public information from the Toastmasters website.
The API documentation by using the url `/api-docs` which will open a UI page description the endpoints.

## Base Url
* Local: `http://localhost:<port>/api/v1`

## Tags
* Pathway API (/paths)

## Endpoints

### Pathway API
* `/`: Get all the pathways
* `/{name}`: Get the pathway with the specified name

#### `/paths`
Get all pathways each with their information of levels and projects.
This endpoint takes no parameters and will return an array of objects that represent the pathways and their information.

The response follow the format:

```
[
  {
    "name": string
    level: [
        {
            name: string
            levelNumber: integer
            numberOfProjects: integer
            projects: [
                {
                    name: string
                    elective: boolean
                    order: integer
                }
            ]
        }
    ]
  }
]
```

#### `/paths/{name}`
Get the pathway information of the specified name with all of its levels and projects.
This endpoint takes one required parameter in the path url which is for the pathway name.

The response follow the format:

```
{
  "name": string
  level: [
      {
          name: string
          levelNumber: integer
          numberOfProjects: integer
          projects: [
              {
                  name: string
                  elective: boolean
                  order: integer
              }
          ]
      }
  ]
}
```
