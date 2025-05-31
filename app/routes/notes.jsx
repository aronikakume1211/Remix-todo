import { redirect, useLoaderData } from "@remix-run/react";
import NewNote from "../components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notex";
import NoteList from "../components/NoteList";

export default function NotesPage() {
    const notes = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
    const notes = await getStoredNotes();
    return notes;
  }
  

export async function action({ request }) {
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);
    // Add validation...
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect('/notes');
  }
  

// export const links = () => {
//   return [...newNoteLinks]; //Surfacing Style
// };
