// next
import Link from "next/link"

export default function MyProfile() {
    // TODO: 
    // read user information to see if user is logged in
    // display corresponding data if user is logged in

    return (<section>
        
        <p>There is no data to display, please <Link href="/login">log in</Link>.</p>
    </section>)
}