"use client";

import { Button } from "@/shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { BanIcon, MoreHorizontalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const followers = [
  { username: "jane_doe", fullName: "Jane Doe" },
  { username: "tech_guru", fullName: "Alex Thompson" },
  { username: "nature_lover", fullName: "Emma Green" },
  { username: "photogirl", fullName: "Sophia Martinez" },
  { username: "code_master", fullName: "Liam Patel" },
];

const following = [
  { username: "startup_guy", fullName: "James Lee" },
  { username: "design_dreamer", fullName: "Mia Wilson" },
  { username: "art_addict", fullName: "Benjamin White" },
  { username: "web_wizard", fullName: "Lucas Nguyen" },
  { username: "health_nut", fullName: "Ella Singh" },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const UserList = ({ users }: { users: typeof following }) => (
  <AnimatePresence>
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      {users.map(({ username, fullName }) => (
        <motion.div
          key={username}
          className="flex items-center gap-2 justify-between"
          variants={itemVariants}
          transition={{ type: "tween" }}
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary" />
            <div>
              <span className="block text-sm leading-none font-semibold">
                {fullName}
              </span>
              <span className="text-xs leading-none">@{username}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline">
              <MoreHorizontalIcon className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="text-destructive">
              <BanIcon className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
);

export default function ViewSelect() {
  return (
    <Tabs defaultValue="objectives" className="w-full h-full flex flex-col">
      <TabsList className="w-full grid grid-cols-3 bg-black/10">
        <TabsTrigger value="objectives" className="items-center border data-[state=active]:shadow-lg">Objectives</TabsTrigger>
        <TabsTrigger value="resources" className="items-center border data-[state=active]:shadow-lg">Resources</TabsTrigger>
        <TabsTrigger value="notes" className="items-center border data-[state=active]:shadow-lg">Notes</TabsTrigger>
      </TabsList>

      <div className="flex-1  p-4 border rounded-md overflow-auto">
        <TabsContent value="objectives" className="h-full">
          {/* <UserList users={followers} /> */}
        </TabsContent>
        <TabsContent value="resources" className="h-full">
      
        </TabsContent>
        <TabsContent value="notes" className="h-full">
     
        </TabsContent>
      </div>
    </Tabs>
  );
}
