import * as crypto from 'crypto';

export function generateEtag(data: any): string {
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
  return `"${hash}"`;
}
