import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileTitleFromUrl, isWikimediaImage, stripHtml, toCandidate } from '../tools/credits/commons.js';

test('file titles come from page, original, and thumbnail URLs', () => {
  assert.equal(fileTitleFromUrl('https://commons.wikimedia.org/wiki/File:Lucanus_cervus.jpg'), 'File:Lucanus cervus.jpg');
  assert.equal(fileTitleFromUrl('https://upload.wikimedia.org/wikipedia/commons/0/09/Lucanus_cervus.jpg'), 'File:Lucanus cervus.jpg');
  assert.equal(fileTitleFromUrl('https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/A_%281%29.jpg/250px-A_%281%29.jpg'), 'File:A (1).jpg');
  assert.equal(fileTitleFromUrl('File:Thrips tabaci.jpg'), 'File:Thrips tabaci.jpg');
});

test('credit fields are plain text', () => {
  assert.equal(stripHtml('<a href="//x">Jane &amp; Co</a>\n<span>(talk)</span>'), 'Jane & Co (talk)');
  const candidate = toCandidate({
    title: 'File:X.jpg',
    imageinfo: [{ descriptionurl: 'https://commons.wikimedia.org/wiki/File:X.jpg', thumburl: 't', width: 1, height: 2, extmetadata: { Artist: { value: '<b>Ann</b>' }, LicenseShortName: { value: 'CC BY 4.0' } } }]
  });
  assert.deepEqual([candidate.creator, candidate.license, candidate.sourceUrl], ['Ann', 'CC BY 4.0', 'https://commons.wikimedia.org/wiki/File:X.jpg']);
});

test('only Wikimedia image hosts can be proxied', () => {
  assert.ok(isWikimediaImage('https://upload.wikimedia.org/a.jpg'));
  assert.ok(isWikimediaImage('https://thumb.wikimedia.org/a.jpg'));
  assert.ok(!isWikimediaImage('https://upload.wikimedia.org.evil.example/a.jpg'));
  assert.ok(!isWikimediaImage('http://localhost/secret'));
});
