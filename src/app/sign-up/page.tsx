"use client"

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const signUpSchema = z.object({
  username: z.string().min(2, "Username too short").max(40, "Username too long"),
  email: z.string().email(),
  password: z.string().min(8, "Password too short")
})

type SignUp = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
  })

   return (
     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         <FormField
           control={form.control}
           name="username"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Username</FormLabel>
               <FormControl>
                 <Input placeholder="display name" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
           control={form.control}
           name="email"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Email</FormLabel>
               <FormControl>
                 <Input placeholder="cool email" {...field} />
               </FormControl>
             </FormItem>
           )}
         />
         <FormField
           control={form.control}
           name="password"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Password</FormLabel>
               <FormControl>
                 <Input placeholder="enter a strong password" {...field} />
               </FormControl>
             </FormItem>
           )}
         />
         <Button type="submit">Submit</Button>
       </form>
     </Form>
   );
}

function onSubmit(values: SignUp) {
  console.log(values)
}