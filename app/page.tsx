import NavBar from "./UI/NavBar/NavBar";
import FirebaseProvider from "./context/firebaseProvider";

export default function Home({children}:{children:any}) {
  return (
      <FirebaseProvider>
        {children}
      </FirebaseProvider>
  );
}
