"use client";

import { useState } from "react";
import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

export default function EditProfile() {
  const [username, setUserName] = useState("");
  const router = useRouter();
  const { setUser, user } = useAuthStore();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleClose = () => router.back();
  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateUser = await updateMe({ username });
    setUser(updateUser);
    router.push("/profile");
  };
  return (
    <div className={css.profileCard}>
      <h1 className={css.formTitle}>Edit Profile</h1>
      <Image
        src={user?.avatar || "avatar"}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />

      <form onSubmit={handleSaveUser} className={css.profileInfo}>
        <div className={css.usernameWrapper}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className={css.input}
            onChange={handleChange}
            placeholder={user?.username || "Enter new name"}
          />
        </div>

        <p>Email: {user?.email || "user_email@example.com"}</p>

        <div className={css.actions}>
          <button type="submit" className={css.saveButton}>
            Save
          </button>
          <button
            onClick={handleClose}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
