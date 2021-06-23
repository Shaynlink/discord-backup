"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEmbedChannel = exports.loadBans = exports.loadEmojis = exports.loadAFK = exports.loadChannels = exports.loadRoles = exports.loadConfig = void 0;
var util_1 = require("./util");
/**
 * Restores the guild configuration
 */
var loadConfig = function (guild, backupData, rateLimitManager) {
    var configPromises = [];
    if (backupData.name) {
        configPromises.push([guild, 'setName', backupData.name]);
    }
    if (backupData.iconBase64) {
        configPromises.push([guild, 'setIcon', Buffer.from(backupData.iconBase64, 'base64')]);
    }
    else if (backupData.iconURL) {
        configPromises.push([guild, 'setIcon', backupData.iconURL]);
    }
    if (backupData.splashBase64) {
        configPromises.push([guild, 'setSplash', Buffer.from(backupData.splashBase64, 'base64')]);
    }
    else if (backupData.splashURL) {
        configPromises.push([guild, 'setSplash', backupData.splashURL]);
    }
    if (backupData.bannerBase64) {
        configPromises.push([guild, 'setBanner', Buffer.from(backupData.bannerBase64, 'base64')]);
    }
    else if (backupData.bannerURL) {
        configPromises.push([guild, 'setBanner', backupData.bannerURL]);
    }
    if (backupData.region) {
        configPromises.push([guild, 'setRegion', backupData.region]);
    }
    if (backupData.verificationLevel) {
        configPromises.push([guild, 'setVerificationLevel', backupData.verificationLevel]);
    }
    if (backupData.defaultMessageNotifications) {
        configPromises.push([guild, 'setDefaultMessageNotifications', backupData.defaultMessageNotifications]);
    }
    var changeableExplicitLevel = guild.features.includes('COMMUNITY');
    if (backupData.explicitContentFilter && changeableExplicitLevel) {
        configPromises.push([guild, 'setExplicitContentFilter', backupData.explicitContentFilter]);
    }
    return rateLimitManager.resolver(configPromises);
};
exports.loadConfig = loadConfig;
/**
 * Restore the guild roles
 */
var loadRoles = function (guild, backupData, rateLimitManager) {
    var rolePromises = [];
    backupData.roles.forEach(function (roleData) {
        if (roleData.isEveryone) {
            rolePromises.push([
                guild.roles.cache.get(guild.id),
                'edit',
                {
                    name: roleData.name,
                    color: roleData.color,
                    permissions: roleData.permissions,
                    mentionable: roleData.mentionable,
                }
            ]);
        }
        else {
            rolePromises.push([
                guild.roles,
                'create',
                {
                    data: {
                        name: roleData.name,
                        color: roleData.color,
                        hoist: roleData.hoist,
                        permissions: roleData.permissions,
                        mentionable: roleData.mentionable
                    }
                }
            ]);
        }
    });
    return rateLimitManager.resolver(rolePromises);
};
exports.loadRoles = loadRoles;
/**
 * Restore the guild channels
 */
var loadChannels = function (guild, backupData, rateLimitManager, options) {
    var loadChannelPromises = [];
    backupData.channels.categories.forEach(function (categoryData) {
        loadChannelPromises.push([
            function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) {
                                util_1.loadCategory(categoryData, guild, rateLimitManager).then(function (createdCategory) {
                                    categoryData.children.forEach(function (channelData) {
                                        util_1.loadChannel(channelData, guild, createdCategory, options, rateLimitManager);
                                        resolve(true);
                                    });
                                });
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            null
        ]);
    });
    backupData.channels.others.forEach(function (channelData) {
        loadChannelPromises.push([util_1.loadChannel, null, channelData, guild, null, options, rateLimitManager]);
    });
    return rateLimitManager.resolver(loadChannelPromises);
};
exports.loadChannels = loadChannels;
/**
 * Restore the afk configuration
 */
var loadAFK = function (guild, backupData, rateLimitManager) {
    var afkPromises = [];
    if (backupData.afk) {
        afkPromises.push([guild, 'setAFKChannel', guild.channels.cache.find(function (ch) { return ch.name === backupData.afk.name; })]);
        afkPromises.push([guild, 'setAFKTimeout', backupData.afk.timeout]);
    }
    return rateLimitManager.resolver(afkPromises);
};
exports.loadAFK = loadAFK;
/**
 * Restore guild emojis
 */
var loadEmojis = function (guild, backupData, rateLimitManager) {
    var emojiPromises = [];
    backupData.emojis.forEach(function (emoji) {
        if (emoji.url) {
            emojiPromises.push([guild.emojis, 'create', emoji.url, emoji.name]);
        }
        else if (emoji.base64) {
            emojiPromises.push([guild.emojis, 'create', Buffer.from(emoji.base64, 'base64'), emoji.name]);
        }
    });
    return rateLimitManager.resolver(emojiPromises);
};
exports.loadEmojis = loadEmojis;
/**
 * Restore guild bans
 */
var loadBans = function (guild, backupData, rateLimitManager) {
    var banPromises = [];
    backupData.bans.forEach(function (ban) {
        banPromises.push([
            guild.members, 'ban', ban.id, {
                reason: ban.reason
            }
        ]);
    });
    return rateLimitManager.resolver(banPromises);
};
exports.loadBans = loadBans;
/**
 * Restore embedChannel configuration
 */
var loadEmbedChannel = function (guild, backupData, rateLimitManager) {
    var embedChannelPromises = [];
    if (backupData.widget.channel) {
        embedChannelPromises.push([
            guild, 'setWidget',
            {
                enabled: backupData.widget.enabled,
                channel: guild.channels.cache.find(function (ch) { return ch.name === backupData.widget.channel; })
            },
        ]);
    }
    return rateLimitManager.resolver(embedChannelPromises);
};
exports.loadEmbedChannel = loadEmbedChannel;
