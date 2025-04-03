
import { AuthService } from "@/app/module/auth/auth-services";
import { createClient } from "@/utils/supabase/server";

export async function DELETE() {
    const supabase = await createClient()
    const session = await AuthService.isSessionValid()
    await supabase.auth.signOut()
    if (session) AuthService.deleteSession()
    return Response.json({ logout: true })
}