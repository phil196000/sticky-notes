# ARCHITECTURE

At high level, the implementation is possible with 3 main components. Those components are:

- Notes area: The area/section the houses the notes and allows a user to create a note by clicking any place on it. It proceeds to create a new note just about around the click area.

- Delete area: This area/section allows users to drag a note card into it to delete that particular card.

- Note card: This item houses the items of a created note

## DIVE

On the base, a Provider lays underneath hood to serve the purpose of a central store or source of truth. When the page loads, the provider retrieves the existing notes from local storage and loads them in the notes area. The provider serves the purpose of holding notes and also holding the base functions needed in the lifecycle of the application.
