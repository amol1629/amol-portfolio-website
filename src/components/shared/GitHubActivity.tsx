"use client";

import { useState, useEffect } from "react";
import { GitCommit, Star, GitFork } from "lucide-react";
import { LiquidGlassCard } from "../glass";
import { Skeleton } from "./loading/Skeleton";
import type { ReactNode } from "react";

interface GitHubActivityProps {
  username: string;
  className?: string;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
}

export function GitHubActivity({ username, className }: GitHubActivityProps): ReactNode {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );
        if (!reposRes.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce(
          (sum: number, repo: { stargazers_count: number }) => sum + repo.stargazers_count,
          0
        );

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          totalStars,
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  if (error) return null;

  return (
    <LiquidGlassCard className={className}>
      <div className="flex items-center gap-2 mb-4">
        <GitCommit className="w-5 h-5 text-[rgb(var(--color-accent-cyan))]" />
        <span className="font-semibold text-[rgb(var(--color-fg-primary))]">GitHub Activity</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-12 mx-auto" variant="text" />
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[rgb(var(--color-fg-primary))]">
              {stats.publicRepos}
            </div>
            <div className="text-xs text-[rgb(var(--color-fg-tertiary))] flex items-center justify-center gap-1">
              <GitFork className="w-3 h-3" /> Repos
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[rgb(var(--color-fg-primary))]">
              {stats.totalStars}
            </div>
            <div className="text-xs text-[rgb(var(--color-fg-tertiary))] flex items-center justify-center gap-1">
              <Star className="w-3 h-3" /> Stars
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[rgb(var(--color-fg-primary))]">
              {stats.followers}
            </div>
            <div className="text-xs text-[rgb(var(--color-fg-tertiary))]">Followers</div>
          </div>
        </div>
      ) : null}

      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center text-sm text-[rgb(var(--color-accent-cyan))] hover:underline"
      >
        View Profile →
      </a>
    </LiquidGlassCard>
  );
}
