program getSin
implicit none

   real :: x
   print *,' Enter x(radian)' 
   
   read *,x 
   print *,SIN(x)
   open (unit = 42, file = "output.txt")
   write (42,*) SIN(x)
   close(42)
   
end program getSin
