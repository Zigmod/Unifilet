"use client";
import { SignedOut, SignInButton, SignOutButton, SignedIn, useOrganization, useUser } from "@clerk/nextjs";
import { Sign } from "crypto";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Organization } from "@clerk/nextjs/server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z.any(),
})

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const createFile = useMutation(api.files.createFile);
  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl font-bold">Your Files</h1>

        <Dialog>
          <DialogTrigger> <Button onClick={() => {
            if (!orgId) return;
            createFile({
              name: "hello world",
              orgId,

            });
          }}
          >
            Upload File
          </Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload your file here</DialogTitle>
              <DialogDescription>
                return (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>file</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                            />
                          </FormControl>
                          <FormDescription>
                            your file                        </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
                )
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      </div>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>
      })}

    </main>
  );
}
