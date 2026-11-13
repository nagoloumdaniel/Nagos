## Mise en situation

Un service qui inscrit des utilisateurs doit contrôler une pièce d'identité fournie en photo.

## Problème

La revue manuelle est lente, et un simple OCR ne dit pas si les données sont cohérentes : la zone MRZ contient des clés de contrôle, le nom saisi doit correspondre à celui du document et le selfie doit ressembler à la photo.

## Solution

Une chaîne de contrôles qui produit une décision explicable. Des règles dures plafonnent la décision : un score élevé ne peut pas blanchir un nom différent ou une clé invalide.
