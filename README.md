# toastmasters-api
An API that retrieves public information from the Toastmasters website.
The API documentation by using the url `/api-docs` which will open a UI page description the endpoints.

## Base Url
* Local: `http://localhost:<port>/api/v1`
* Vercel: `https://toastmasters-api.vercel.app`

## Tags
* Pathway API (/paths)
* Role API (/roles)
* Cabinet Role API (/cabinet-roles)

## Endpoints

### Pathway API
* `/`: Get all the pathways
* `/update`: Update the pathways from the Toastmasters website
* `/{name}`: Get the pathway with the specified name

### Role API
* `/`: Get all the roles
* `/update`: Update the roles that can be used in a roster

### Cabinet Role API
* `/`: Get all the cabinet roles
* `/update`: Update the cabinet roles that can be present in a cabinet

## More Info
All the information on the endpoints can be viewed in the API specification which can be access
through the `/api-docs` endpoint.
