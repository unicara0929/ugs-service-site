"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import content from "../../../content/ja.json";

type Member = {
  id: string;
  name: string;
  role: string;
  year: string;
  summary: string;
  image: string;
};

const members: Member[] = content.stories.members;

// 職種リストを取得
const roles = Array.from(new Set(members.map((m) => m.role)));

export default function StoriesPage() {
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const filteredMembers =
    selectedRole === "all"
      ? members
      : members.filter((m) => m.role === selectedRole);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-black tracking-wider">
              UGS
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-orange-500 transition-colors">
                TOP
              </Link>
              <Link href="/#about" className="text-sm font-medium hover:text-orange-500 transition-colors">
                UGSについて
              </Link>
              <Link href="/stories" className="text-sm font-medium text-orange-500">
                メンバーストーリー
              </Link>
              <Link href="/#recruit" className="text-sm font-medium hover:text-orange-500 transition-colors">
                募集要項
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.3em] text-gray-400 block mb-4">
              MEMBERS STORY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              メンバー紹介
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              UGSで働く仲間たちのリアルな声をお届けします。<br />
              それぞれの想いと、成長のストーリー。
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-500">職種で絞り込み:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRole("all")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedRole === "all"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                すべて
              </button>
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    selectedRole === role
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <span className="ml-auto text-sm text-gray-400">
              {filteredMembers.length}名
            </span>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <Link
                key={member.id}
                href={`/story/${member.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded">
                          {member.role}
                        </span>
                        <span className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded">
                          {member.year}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-bold mb-1">{member.name}</h3>

                      {/* Summary */}
                      <p className="text-xs text-white/80 line-clamp-2">
                        {member.summary}
                      </p>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="p-4 flex items-center justify-between text-sm font-medium bg-gray-50 group-hover:bg-orange-50 transition-colors">
                    <span>READ MORE</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-4 h-4 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            TOPに戻る
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xl font-black tracking-wider">UGS</div>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                TOP
              </Link>
              <Link href="/#about" className="text-sm text-gray-400 hover:text-white transition-colors">
                UGSについて
              </Link>
              <Link href="/stories" className="text-sm text-gray-400 hover:text-white transition-colors">
                メンバーストーリー
              </Link>
              <Link href="/#recruit" className="text-sm text-gray-400 hover:text-white transition-colors">
                募集要項
              </Link>
            </nav>
            <p className="text-sm text-gray-500">
              © 2026 UGS Inc. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
