import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-green-600">
              <img
              src="/Frame.png"
              className=""
               
              />
             
              
            </div>
          </div>
          <CardTitle className="text-[#006045] text-2xl font-bold">
            Join ASTUMSJ Library
          </CardTitle>
          <CardDescription className="text-green-700">
            Create your student account to access library services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className= "space-y-4">
          <div className="text-[#008952B2]">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Enter your full name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" type="text" placeholder="Enter your Student ID" required />
            </div>

           <div className="grid gap-2">
            <Label htmlFor="department">Department</Label>
            <Select>
              <SelectTrigger
              id="department"
              className="bg-white border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectContent>
            </Select>
           </div>


            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create Password" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
            </div>
          </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Sign In
            </Button>

            <div className="text-center text-sm mt-2">
              Don’t have an account?{" "}
              <a href="#" className="text-green-700 font-semibold hover:underline">
                Register here
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
