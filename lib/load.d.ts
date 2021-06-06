import type { BackupData, LoadOptions } from './types';
import type { Emoji, Guild, Role } from 'discord.js';
import { RateLimitManager } from './ratelimit';
/**
 * Restores the guild configuration
 */
export declare const loadConfig: (guild: Guild, backupData: BackupData, rateLimitManager: RateLimitManager) => Promise<Guild[]>;
/**
 * Restore the guild roles
 */
export declare const loadRoles: (guild: Guild, backupData: BackupData, rateLimitManager: RateLimitManager) => Promise<Role[]>;
/**
 * Restore the guild channels
 */
export declare const loadChannels: (guild: Guild, backupData: BackupData, rateLimitManager: RateLimitManager, options: LoadOptions) => Promise<unknown[]>;
/**
 * Restore the afk configuration
 */
export declare const loadAFK: (guild: Guild, backupData: BackupData, rateLimitManager: RateLimitManager) => Promise<Guild[]>;
/**
 * Restore guild emojis
 */
export declare const loadEmojis: (guild: Guild, backupData: BackupData, rateLimitManager: RateLimitManager) => Promise<Emoji[]>;
/**
 * Restore guild bans
 */
export declare const loadBans: (guild: Guild, backupData: BackupData, rateLimitManager: RateLimitManager) => Promise<string[]>;
/**
 * Restore embedChannel configuration
 */
export declare const loadEmbedChannel: (guild: Guild, backupData: BackupData, rateLimitManager: RateLimitManager) => Promise<Guild[]>;
