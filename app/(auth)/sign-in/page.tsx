"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const {
            register, 
            handleSubmit, 
            formState: {errors,isSubmitting},
          }= useForm<SignInFormData>({
            defaultValues:{
              email: "",
              password:"",   
            },
            mode : 'onBlur'
          }, );

      const onSubmit = async(data: SignInFormData) => {
      try {
        const result = await signInWithEmail(data);
        if(result.success) router.push('/');
      } catch(e) {
        console.error(e);
        toast.error('Sign in failed',{
          description: e instanceof Error? e.message: `Failed to sign in`
        })
      }
    }
  return (
      <div>
        <p className="text-gray-500 text-md mb-2">Welcome back,</p>
        <h1 className="form-title">Log In Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          register={register}
          error={errors.email}
          validation={{required: 'Email is required', pattern: /^\w+@\w+\.\w+$/, message: "Email address is Required"}}
        />

        <InputField
          name="password"
          label="password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{required: 'Password is required', minLength: 8}}
        />

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting?'Signing In' : 'Sign in'}
        </Button>
        <FooterLink text="Don't have an account? " linkText="Create an account" href="/sign-up"/>
        </form>
      </div>
   
  )
}

export default SignIn