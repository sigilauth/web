/**
 * Sigil Auth API Types
 * Generated from /api/openapi.yaml
 *
 * These types match the OpenAPI schema definitions for type-safe API calls.
 */

// ============================================
// Common Types
// ============================================

export interface Action {
	type: string;
	description: string;
	params?: Record<string, unknown>;
}

export interface Error {
	error: {
		code: string;
		message: string;
		details?: Record<string, unknown>;
	};
}

// ============================================
// Server Info
// ============================================

export interface ServerInfo {
	server_id: string;
	server_name: string;
	server_public_key: string; // base64 compressed P-256
	server_pictogram: string[]; // 5 emoji strings
	server_pictogram_speakable: string; // hyphen-separated
	version: string;
	mode: 'init' | 'operational';
	relay_url: string;
	features: {
		mpa: boolean;
		secure_decrypt: boolean;
		mnemonic_generation: boolean;
		webhooks: boolean;
	};
}

// ============================================
// Challenge Flow
// ============================================

export interface ChallengeRequest {
	fingerprint: string; // hex(sha256)
	device_public_key: string; // base64 compressed P-256
	action: Action;
}

export interface ChallengeCreated {
	challenge_id: string; // UUID
	fingerprint: string;
	pictogram: string[]; // 5 emoji strings
	pictogram_speakable: string;
	expires_at: string; // ISO8601
}

export interface ChallengeResponse {
	challenge_id: string; // UUID
	device_public_key: string;
	decision: 'approved' | 'rejected';
	signature: string; // base64 ECDSA signature
	timestamp: string; // ISO8601
}

export interface ChallengeVerified {
	verified: boolean;
	fingerprint: string;
	pictogram: string[];
	pictogram_speakable: string;
	action: Action;
}

export interface ChallengeStatus {
	challenge_id: string; // UUID
	status: 'pending' | 'verified' | 'rejected' | 'expired';
	fingerprint?: string;
	pictogram?: string[];
	pictogram_speakable?: string;
	decision?: 'approved' | 'rejected';
	verified_at?: string; // ISO8601
}

// ============================================
// Multi-Party Authorization (MPA)
// ============================================

export interface MPAGroupMember {
	fingerprint: string;
	device_public_key: string;
}

export interface MPAGroup {
	members: MPAGroupMember[];
}

export interface MPARequest {
	request_id: string;
	action: Action;
	required: number; // Number of groups that must approve
	groups: MPAGroup[];
	reject_policy?: 'continue' | 'reject_on_first';
	expires_in_seconds?: number; // 60-900, default 300
}

export interface MPACreated {
	request_id: string;
	status: 'pending';
	groups_required: number;
	groups_total: number;
	challenges_sent: number;
	expires_at: string; // ISO8601
}

export interface MPAResponse {
	request_id: string;
	device_public_key: string;
	decision: 'approved' | 'rejected';
	signature: string;
	timestamp: string; // ISO8601
}

export interface MPAStatus {
	request_id: string;
	status: 'pending' | 'approved' | 'rejected' | 'timeout';
	groups_satisfied: number[];
	groups_required: number;
	groups_total: number;
	expires_at: string; // ISO8601
}

// ============================================
// Secure Decrypt
// ============================================

export interface DecryptRequest {
	fingerprint: string;
	device_public_key: string;
	integrator_encrypted_payload: string; // base64(ephemeral_public || nonce || ciphertext || tag)
	action: Action;
}

export interface DecryptCreated {
	request_id: string;
	fingerprint: string;
	expires_at: string; // ISO8601
}

export interface DecryptResponse {
	request_id: string;
	device_public_key: string;
	encrypted_plaintext: string; // Transport-encrypted to Sigil
	signature: string;
	timestamp: string; // ISO8601
}

export interface DecryptVerified {
	status: 'decrypted';
	fingerprint: string;
	pictogram: string[];
	pictogram_speakable: string;
	plaintext: string; // base64
	decrypted_at: string; // ISO8601
}

export interface DecryptStatus {
	request_id: string;
	status: 'pending' | 'decrypted' | 'rejected' | 'expired';
	fingerprint?: string;
	pictogram?: string[];
	pictogram_speakable?: string;
	plaintext?: string;
	decrypted_at?: string; // ISO8601
}

// ============================================
// Relay Endpoints
// ============================================

export interface DeviceRegistration {
	device_public_key: string;
	push_token: string;
	platform: 'apns' | 'fcm';
}

export interface DeviceRegistered {
	fingerprint: string;
	pictogram: string[];
	pictogram_speakable: string;
}

// ============================================
// Webhooks
// ============================================

export type WebhookEvent =
	| 'challenge.verified'
	| 'challenge.rejected'
	| 'challenge.expired'
	| 'decrypt.completed'
	| 'decrypt.rejected'
	| 'decrypt.expired'
	| 'mpa.approved'
	| 'mpa.rejected'
	| 'mpa.timeout';

export interface WebhookConfig {
	url: string;
	events: WebhookEvent[];
	secret?: string; // For HMAC verification
}

export interface WebhookCreated {
	webhook_id: string;
	url: string;
	events: WebhookEvent[];
	created_at: string; // ISO8601
}

export interface WebhookPayload<T = unknown> {
	event: WebhookEvent;
	timestamp: string; // ISO8601
	data: T;
}

// ============================================
// Pairing (Integrator-Implemented, Not Sigil)
// ============================================

/**
 * Pairing endpoints are implemented by the integrator (your app),
 * not by Sigil service. These types define the expected contract
 * for the web demo pairing flow.
 */

export interface PairingInitiateRequest {
	action: 'register' | 'mnemonic-init';
	callback_url: string;
}

export interface PairingSession {
	session_id: string;
	session_token: string; // stk_<random>
	expires_at: string; // ISO8601
	transports: {
		qr_url: string; // sigil://register?...
		pairing_code: string; // 8 digits
		deep_link: string; // same as qr_url
	};
	server_identity: {
		server_url: string;
		server_name: string;
		server_public_key: string;
		server_pictogram: string[];
		server_pictogram_speakable: string;
	};
}

export interface PairingRedeemRequest {
	pairing_code: string; // 8 digits
}

export interface PairingPayload {
	server_url: string;
	server_public_key: string;
	server_name: string;
	server_pictogram: string[];
	server_pictogram_speakable: string;
	callback_url: string;
	session_token: string;
}

export interface PairingCallbackRequest {
	session_token: string;
	type: 'registration' | 'mnemonic';
	// For registration:
	device_public_key?: string;
	device_name?: string;
	attestation?: unknown;
	// For mnemonic:
	encrypted_mnemonic?: string;
	word_count?: number;
}

export interface PairingCallbackResponse {
	status: 'accepted';
	fingerprint: string;
	pictogram: string[];
	pictogram_speakable: string;
}
