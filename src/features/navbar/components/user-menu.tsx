"use client"
import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { User } from '@supabase/supabase-js';
import Avatar from "boring-avatars";
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function UserMenu({user}: {user: User}) {
  const supabase = createClient();
  const router = useRouter();

  const handleUserSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    router.push('/')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
           size={30}
            name={user.email as string}
            variant="bauhaus"
            colors={["#393d3f","#fdfdff","#c6c5b9","#62929e","#546a7b"]}
            className='hover:cursor-pointer hover:scale-105'
          />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-64' align='end'>
        <DropdownMenuLabel className='flex min-w-0 flex-col'>
          <span className='text-foreground truncate text-sm font-medium'>
            {user?.user_metadata?.full_name}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className='opacity-60' aria-hidden='true' />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className='opacity-60' aria-hidden='true' />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className='opacity-60' aria-hidden='true' />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className='opacity-60' aria-hidden='true' />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className='opacity-60' aria-hidden='true' />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleUserSignOut}>
          <LogOutIcon size={16} className='opacity-60' aria-hidden='true' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
