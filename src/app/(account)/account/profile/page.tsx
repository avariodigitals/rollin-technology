
"use client"

import { useState } from "react"
import { Pencil, User, Mail, Phone, Building2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store/authStore"


export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName ?? "")
  const [lastName, setLastName] = useState(user?.lastName ?? "")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")

  if (!user) return null

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">My Profile</h1>

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold text-foreground">Personal Information</h2>
          <Button variant="outline" size="sm" onClick={() => setEditing((prev) => !prev)} className="gap-1.5">
            <Pencil className="size-3.5" />
            {editing ? "Cancel" : "Edit"}
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">First Name</label>
            <div className="relative">
              <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" value={firstName} disabled={!editing} onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Last Name</label>
            <Input value={lastName} disabled={!editing} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" value={user.email} disabled />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Phone Number</label>
            <div className="relative">
              <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                value={phone}
                disabled={!editing}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Not set"
              />
            </div>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">Company / Organisation</label>
            <div className="relative">
              <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                value={company}
                disabled={!editing}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Not set"
              />
            </div>
          </div>
        </div>

        {editing && (
          <Button className="mt-4" onClick={() => setEditing(false)}>
            Save changes
          </Button>
        )}
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Password &amp; Security</h2>
        <p className="mt-1 text-xs text-muted-foreground">Not wired to a real mutation yet.</p>
        <div className="mt-4 grid gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Current Password</label>
            <Input type="password" disabled />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">New Password</label>
            <Input type="password" disabled />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Confirm New Password</label>
            <Input type="password" disabled />
          </div>
          <Button disabled className="w-fit">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  )
}