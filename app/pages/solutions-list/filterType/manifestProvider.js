import fs from 'fs';

export class ManifestProvider {
  getSolutionListManifest(type) {
    this.manifestFileContent = fs.readFileSync(`./app/pages/solutions-list/filterType/${type}/manifest.json`);
    this.manifest = JSON.parse(this.manifestFileContent);
    return this.manifest;
  }
}
