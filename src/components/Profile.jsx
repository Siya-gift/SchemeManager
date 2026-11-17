import { useState, useEffect } from "react";
import luffyImg from "../images/Luffy_profile_pic.jpg";
import pen_edit from "../images/pen_edit.svg";
import { supabase } from "../lib/supabaseClient.js";
import { getAuthUserDisplayName } from "../lib/authUserName.js";
import toast from "react-hot-toast";

const getAuthUserAvatar = (user) =>
  user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "";

function Profile({
  toggleState,
  toggleMobileState,
  setToggleState,
  settoggleMobileState,
}) {
  const [name, setName] = useState("Account");
  const [email, setEmail] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [phone, setPhone] = useState("0725678900");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 1. Get the currently logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) return;
        setEmail(user?.email);

        // Set initial values from Auth metadata while database loads
        if (user.user_metadata?.avatar_url) {
          setUserProfilePicture(user.user_metadata.avatar_url);
        }
        if (user.user_metadata?.full_name) {
          setName(user.user_metadata.full_name);
        }

        // 2. Fetch the latest values from your "Members" table
        const { data: memberData, error: dbError } = await supabase
          .from("Members")
          .select("member_name, profile_pictures")
          .eq("id", user.id) // Change to .eq("email", user.email) if matched by email
          .single();

        if (dbError) throw dbError;

        if (memberData) {
          if (memberData.profile_pictures) {
            setUserProfilePicture(memberData.profile_pictures);
          }
          if (memberData.name) {
            setName(memberData.name);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateName = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No authenticated user found.");

      const { error: authError } = await supabase.auth.updateUser({
        data: { name: trimmedName },
      });
      if (authError) throw authError;

      const { error: dbError } = await supabase
        .from("Members")
        .update({ member_name: trimmedName })
        .eq("id", user.id);

      if (dbError) throw dbError;

      setName(trimmedName);
      toast.success("Name updated!");
    } catch (error) {
      console.error("Error updating profile name:", error);
      toast.error(`Could not update name: ${error.message}`);
    }
  };

  const handleUpdateAvatar = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // 1. Get the currently authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError;

      // 2. Create a unique file path (e.g., "user-id/1731880000.png")
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      // 3. Upload image to your Supabase Storage bucket (replace "avatars" with your bucket name)
      const { error: uploadError } = await supabase.storage
        .from("profile_pictures")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 4. Retrieve the public URL for the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("profile_pictures").getPublicUrl(filePath);

      // 5. Update Supabase Auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { profile_pictures: publicUrl },
      });
      if (authError) throw authError;

      // 6. Update the "Members" table
      const { error: dbError } = await supabase
        .from("Members")
        .update({ profile_pictures: publicUrl }) // Replace 'avatar_url' with your exact column name
        .eq("id", user.id); // Change to .eq("email", user.email) if matched by email

      if (dbError) throw dbError;

      // Optional: Update local React state so the UI refreshes immediately
      setUserProfilePicture(publicUrl);
      console.log("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  return (
    <div
      className={`Profile w-full min-h-screen p-4 
        md:p-8  ${toggleMobileState === 0 ? "block" : "hidden"} 
        ${toggleState === 0 ? "md:block" : "md:hidden"}`}
    >
      <div className="hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-4">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
      </div>

      <div className="glass p-10">
        <div
          onClick={() => {
            setToggleState(6);
            settoggleMobileState(6);
          }}
          className="group text-[11px] cursor-pointer flex items-center gap-3 text-white"
        >
          <i className="fa-solid fa-chevron-left  transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
          <h3>Back to Setings</h3>
        </div>

        <div className="flex flex-col w-full my-6">
          {/* pp here */}
          <div className="w-full">
  <div className="relative inline-block">
    <input
      id="avatar-input"
      type="file"
      accept="image/*"
      onChange={handleUpdateAvatar}
      className="hidden"
    />

    <label
      htmlFor="avatar-input"
      className="group relative cursor-pointer block rounded-full overflow-hidden"
    >
      <img
        src={userProfilePicture ? userProfilePicture : luffyImg}
        className="h-30 aspect-square rounded-full object-cover transition"
        alt="Profile"
      />

      {/* Hover Plus Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <svg
          xmlns="http://w3.org"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-white/90 transition-all duration-200"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </div>
    </label>

    {/* Always-Visible Pen Badge */}
    <label
      htmlFor="avatar-input"
      className="absolute bottom-1 right-1 bg-neutral-800 hover:bg-neutral-700 p-2 rounded-full border border-white/20 cursor-pointer shadow-md transition"
    >
      <img src={pen_edit} alt="Edit avatar" className="w-4 h-4" />
    </label>
  </div>

  <p className="text-white font-medium text-sm mt-2">{email}</p>
</div>


          <h3 className="text-[24px] text-white/70 font-bold mt-7">
            My Account info
          </h3>
          <div className="flex flex-col">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full max-w-md gap-2 mt-3">
            <h3 className="text-white text-sm sm:text-base">Name:</h3>

            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              <input
                id="name-input"
                className="bg-transparent text-white outline-none focus:ring-1 focus:ring-white/40 rounded px-2 py-1 w-full sm:w-48 text-sm sm:text-base"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={handleUpdateName}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="example: Johnson"
              />

              <label htmlFor="name-input" className="cursor-pointer shrink-0">
                <img className="h-5 w-5" src={pen_edit} alt="edit" />
              </label>
            </div>
            
          </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full max-w-md gap-2 mt-3">
            <h3 className="text-white text-sm sm:text-base">Phone number:</h3>

            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              <input
                id="phone-input"
                className="bg-transparent text-white outline-none focus:ring-1 focus:ring-white/40 rounded px-2 py-1 w-full sm:w-48 text-sm sm:text-base"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="tel"
                placeholder="example: Johnson"
              />

              <label htmlFor="phone-input" className="cursor-pointer shrink-0">
                <img className="h-5 w-5" src={pen_edit} alt="edit" />
              </label>
            </div>
            
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
