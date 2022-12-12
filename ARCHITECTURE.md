# ARCHITECTURE

At high level, the implementation is possible with 4 main components. Those components are:

- Notes area: The area/section the houses the notes and allows a user to create a note by clicking any place on it. It proceeds to create a new note just about around the click area.

- Delete area: This area/section allows users to drag a note card into it to delete that particular card.

- Note card: This item houses the items of a created note

- Notes Provider: On the base, a Provider lays underneath hood to serve the purpose of a central store or source of truth. When the page loads, the provider retrieves the existing notes from local storage and loads them in the notes area. The provider serves the purpose of holding notes and also holding the base functions needed in the lifecycle of the application.

## Dive

When the application loads, the provider retrieves existing notes. Clicking an area of the Notes area creates a new note. Dragging from the `Drag from here into the trash to delete`, deletes the dragged note from both local storage and notes state in the application. To avoid multiple reads from the local storage on every notes updates `ie: Delete, Edit and Dragging`, application state is updated as well as local storage, to keep both in sync, but read is done entirely from application state. When dragging of note to any different location is initialized, the click event of the notes area is disable to prevent creation of new notes when drag is over.
