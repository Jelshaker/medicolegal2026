---
title: "Measurement Error in Radiological Quantification"
description: "How calibration, positioning, plane selection, anatomical landmarks and observer variability affect radiological measurements used in personal-injury and clinical-negligence claims."
pubDate: 2026-02-02
category: quantum
tags:
  - "Quantum and Causation"
  - "Musculoskeletal"
  - "Measurement"
  - "PACS"
  - "Radiography"
  - "MRI"
anonymised: false
keyTakeaways:
  - "A numerical measurement may appear precise without being anatomically accurate."
  - "Projection radiography, CT and MRI have different sources of measurement error."
  - "The expert should identify the image, plane, landmarks, calibration method and uncertainty relevant to each material measurement."
  - "Small differences should not be treated as clinically or legally significant without considering reproducibility and the decision threshold."
  - "Radiological measurement is evidence for the court; it does not by itself determine prognosis, disability or damages."
figures:
  - "/images/knee_xray_pen_pointing.jpg"
---

## Introduction

Radiological measurements may influence diagnosis, treatment, prognosis and the valuation of injury.

Examples include:

- limb-length discrepancy;
- mechanical-axis deviation;
- joint-space width;
- fracture displacement;
- vertebral compression;
- spinal canal dimensions;
- angular deformity;
- tumour size;
- cartilage-defect dimensions;
- muscle cross-sectional area;
- skeletal maturity;
- implant position; and
- change between serial examinations.

A number displayed by a PACS measurement tool may appear exact to a fraction of a millimetre or degree. That apparent precision does not necessarily establish anatomical accuracy or clinical significance.

A defensible expert opinion should explain:

1. what was measured;
2. why the measurement is relevant;
3. how it was obtained;
4. what technical and biological uncertainty applies;
5. whether another competent observer could reasonably obtain a different result; and
6. whether the difference crosses a meaningful clinical threshold.

## Precision, Accuracy and Reproducibility

These concepts should be distinguished.

### Precision

Precision describes the resolution or consistency of a measurement.

A PACS tool may display a distance as 12.4 mm. The decimal place does not prove that the true anatomical dimension is known to that degree of accuracy.

### Accuracy

Accuracy describes how closely the recorded measurement represents the true anatomical value.

A measurement can be highly reproducible but systematically inaccurate because of magnification, calibration error, positioning or selection of the wrong plane.

### Repeatability

Repeatability describes agreement when the same observer repeats the measurement using the same method.

This is often called intra-observer agreement.

### Reproducibility

Reproducibility describes agreement between different observers, workstations, examinations or methods.

This is often called inter-observer agreement when different readers are involved.

### Clinical significance

A statistically or technically detectable difference may have no effect on diagnosis, treatment or prognosis.

The expert should not assume that every measurable difference is clinically important.

## Measurement Is Not an Independent Fact

An imaging measurement depends on choices made by the observer.

These may include:

- the examination selected;
- the image or reconstruction;
- the measurement plane;
- window and level;
- magnification;
- anatomical landmarks;
- boundary placement;
- inclusion or exclusion of adjacent structures;
- whether the longest dimension or a standardised dimension is used;
- whether measurements are two-dimensional or volumetric; and
- whether the same method is applied on serial studies.

The result should therefore be described as a measurement made using a defined method, not as an infallible property of the anatomy.

## Projection Radiography

Projection radiographs are affected by geometric magnification.

The apparent size of a structure depends on:

- source-to-detector distance;
- object-to-detector distance;
- the depth of the anatomy;
- patient positioning;
- beam centring;
- angulation;
- rotation; and
- whether a calibration marker was used.

Digital acquisition does not remove geometric magnification.

A PACS system may measure distances accurately on the image while the image itself remains magnified relative to the patient's anatomy.

## Calibration Markers

Where true anatomical dimensions are important, a reference marker of known size may assist calibration.

Its usefulness depends on placement.

The marker should be positioned as close as reasonably possible to the anatomical plane being measured. A marker placed on the skin may lie at a different depth from a joint, bone or implant and may therefore experience different magnification.

The expert should establish:

- whether a marker was present;
- its known size;
- where it was positioned;
- whether the measurement software used it;
- whether the DICOM metadata already included calibrated pixel spacing;
- whether calibration was automatic or manual; and
- whether the marker and anatomy were sufficiently close in depth.

The absence of a marker does not make every radiographic measurement invalid.

It may, however, limit confidence in absolute dimensions required for:

- implant templating;
- true limb-length assessment;
- prosthetic sizing;
- magnification-sensitive thresholds; or
- comparison between differently acquired radiographs.

## DICOM Pixel Spacing

PACS measurements may derive scale from DICOM metadata.

Relevant information can include:

- imager pixel spacing;
- patient pixel spacing;
- estimated radiographic magnification factor; and
- modality-specific calibration data.

These values should not be assumed to be interchangeable.

Imager pixel spacing describes the detector plane. It may not represent the true dimension of anatomy situated away from the detector.

Patient pixel spacing may incorporate calibration, but the expert should establish how it was generated where the accuracy of the measurement is disputed.

A workstation displaying a line in millimetres does not, by itself, prove that patient-specific magnification has been corrected.

## Positioning and Projection

Patient positioning can materially alter apparent alignment and dimensions.

Examples include:

- rotation on a knee or pelvic radiograph;
- flexion during spinal imaging;
- variable weight-bearing;
- inconsistent limb rotation;
- pelvic tilt;
- beam divergence;
- incomplete inclusion of the mechanical axis; and
- different source-to-detector distances.

An apparent interval change may reflect acquisition rather than biological change.

Serial measurements should therefore be compared cautiously where examinations were obtained:

- in different positions;
- with different projections;
- under weight-bearing and non-weight-bearing conditions;
- on different systems;
- with different calibration methods; or
- with different anatomical coverage.

## Angular Measurements

Angular measurements may avoid some absolute magnification problems, but they remain sensitive to positioning and landmark selection.

Examples include:

- Cobb angle;
- mechanical-axis alignment;
- tibial slope;
- acetabular angles;
- kyphotic deformity;
- fracture angulation; and
- joint orientation angles.

The report should identify:

- the lines drawn;
- the anatomical landmarks selected;
- the projection used;
- whether the patient was weight-bearing;
- whether rotation was acceptable;
- and the likely variability of the method.

A difference of several degrees may reflect observer or positioning variation rather than meaningful progression.

## CT Measurements

CT generally avoids projection magnification because measurements are derived from reconstructed cross-sectional data.

Different sources of variability remain.

These include:

- slice thickness;
- reconstruction interval;
- reconstruction kernel;
- field of view;
- multiplanar plane selection;
- partial-volume averaging;
- contrast phase;
- patient movement;
- obliquity;
- window and level;
- segmentation method; and
- choice of anatomical boundary.

A lesion or fragment measured obliquely may appear larger than when measured on a plane perpendicular to its principal axis.

The expert should consider whether multiplanar reconstruction is required to identify the true maximum or clinically relevant dimension.

## MRI Measurements

MRI measurements may vary with:

- sequence;
- slice thickness;
- slice gap;
- field strength;
- patient positioning;
- image distortion;
- plane selection;
- signal contrast;
- partial-volume effects;
- motion;
- boundary definition; and
- the biological state of the tissue.

A cartilage defect, tendon tear or marrow lesion may have different apparent dimensions on different sequences.

The expert should identify which sequence best demonstrates the relevant boundary and whether the selected measurement is reproducible.

Windowing terminology should also be used carefully. CT display is commonly described using window width and level. MRI display brightness and contrast can be adjusted, but MRI signal intensity is not represented by a standard Hounsfield scale.

## Ultrasound Measurements

Ultrasound is particularly operator-dependent.

Measurements may vary with:

- transducer position;
- insonation angle;
- compression;
- patient position;
- respiratory phase;
- gain;
- depth;
- focal zone;
- caliper placement; and
- whether the longest dimension was captured.

Saved still images may not show whether a larger dimension was present elsewhere during the dynamic examination.

Where material, the expert should distinguish review of stored ultrasound images from performance of the original real-time examination.

## Three-Dimensional and Volumetric Measurements

Volume may be estimated using:

- simple geometric formulae;
- manual segmentation;
- semi-automated segmentation;
- automated software; or
- three-dimensional reconstruction.

Each method introduces assumptions.

A volume derived from three orthogonal diameters assumes a particular shape. Manual segmentation depends on boundary selection. Automated segmentation may fail where the lesion contacts adjacent structures or has heterogeneous signal or attenuation.

The report should state:

- the method;
- the software where relevant;
- the included boundaries;
- whether segmentation was checked manually;
- whether the same method was used on comparison studies; and
- the expected variability.

A percentage volume change can exaggerate the apparent importance of a small absolute boundary difference.

## Window, Level and Boundary Selection

Display settings can alter the apparent margin of an abnormality.

This is particularly relevant to:

- pulmonary nodules;
- bone lesions;
- fracture gaps;
- calcification;
- cartilage defects;
- soft-tissue masses;
- haemorrhage;
- necrosis; and
- structures with indistinct margins.

The expert should use a clinically appropriate and reproducible display method.

It is not usually necessary to record every display adjustment. The settings should be documented where measurement materially depends on them or where opposing experts appear to have used different tissue boundaries.

A disagreement that seems numerical may in fact arise from measuring different biological components.

## Anatomical Landmarks

Many measurements depend on landmarks that are not perfectly discrete.

Examples include:

- the edge of an articular surface;
- the centre of a femoral head;
- the endplate margin;
- the physeal boundary;
- the tumour interface;
- the border of oedema;
- the cortical margin;
- the deepest point of a cartilage defect; and
- the axis of a long bone.

The report should define the landmarks used where the measurement affects the opinion.

A measurement should not be presented as objectively reproducible if reasonable observers could select different boundaries.

## Measurement of Change Over Time

A difference between two examinations may represent:

- true biological change;
- different acquisition technique;
- different positioning;
- different reconstruction;
- different calibration;
- observer variation;
- treatment effect;
- physiological variation; or
- a combination of these.

The expert should ask whether the observed change exceeds the expected measurement variability.

A statement such as:

> The lesion increased from 10 mm to 12 mm.

may imply greater certainty than the images support.

Where appropriate, a more defensible formulation may be:

> The lesion is similar in size. The apparent 2 mm difference is within the likely variability arising from plane and boundary selection.

Conversely, a consistent increase across several dimensions and examinations may support genuine progression even where each individual measurement has some uncertainty.

## Measurements Near a Threshold

Measurement disputes are particularly important where a threshold affects:

- diagnosis;
- treatment;
- surveillance;
- operative indication;
- impairment classification;
- prognosis;
- disability assessment; or
- valuation of loss.

The expert should identify:

- the source and status of the threshold;
- whether it is absolute or advisory;
- whether the measurement method matches that used to derive the threshold;
- expected observer variability;
- whether repeated measurements straddle the threshold;
- whether other clinical factors influence the decision; and
- whether crossing the threshold would actually have changed management.

A difference between 9.9 mm and 10.1 mm should not be treated as decisive merely because software displays tenths of a millimetre.

## Skeletal Maturity and Growth

Assessment of skeletal maturity is an estimate rather than a direct measurement of chronological age.

Methods may consider:

- hand and wrist radiographs;
- elbow maturation;
- pelvic apophyses;
- triradiate cartilage;
- growth-plate appearance;
- knee maturation;
- cervical vertebral morphology; or
- MRI features.

The expert should distinguish:

- chronological age;
- bone age;
- skeletal maturity;
- remaining growth potential; and
- predicted final deformity or limb length.

Population-based reference methods have limits and may not transfer perfectly to every individual.

Skeletal maturity should not be converted into an exact prediction of future growth without acknowledging biological variation.

## Limb Length

Limb-length measurement may be influenced by:

- projection;
- magnification;
- pelvic obliquity;
- joint contracture;
- limb rotation;
- weight-bearing;
- anatomical versus functional shortening;
- choice of landmarks; and
- whether the image includes the complete limb.

The report should distinguish:

- true osseous length;
- apparent length;
- structural discrepancy;
- functional discrepancy; and
- clinical measurement.

A radiological measurement does not necessarily represent the patient's functional inequality when standing or walking.

## Mechanical Axis

Mechanical-axis analysis usually requires appropriate long-leg weight-bearing imaging.

A standard knee radiograph may not permit reliable assessment of the complete lower-limb mechanical axis.

The expert should record:

- whether the full limb was included;
- whether the patient was weight-bearing;
- patellar orientation;
- knee flexion;
- pelvic position;
- the selected hip, knee and ankle centres; and
- whether deformity is intra-articular or extra-articular.

Measurements from non-standard or cropped images should be qualified.

## Joint-Space Width

Joint-space width is affected by:

- weight-bearing;
- flexion;
- beam angle;
- rotation;
- meniscal position;
- positioning protocol; and
- landmark selection.

A difference between serial examinations may not represent true cartilage loss if acquisition differs.

Claims concerning progression of osteoarthritis should consider the complete radiographic pattern and clinical evidence rather than a single joint-space measurement.

## Cartilage Defects

Cartilage measurements are sensitive to:

- MRI sequence;
- spatial resolution;
- partial-volume averaging;
- plane;
- surface irregularity;
- whether fissuring is included;
- distinction between partial- and full-thickness loss; and
- postoperative change.

A two-dimensional diameter may not describe clinical severity adequately.

The report should distinguish:

- surface dimensions;
- depth;
- estimated area;
- estimated volume;
- subchondral change; and
- the anatomical importance of the location.

## Fracture Displacement and Deformity

Fracture measurement may include:

- translation;
- angulation;
- shortening;
- step-off;
- gap;
- rotation; and
- articular incongruity.

Projection can materially affect apparent displacement.

CT may provide a better assessment of complex articular injury, but even CT measurements depend on reconstruction plane and landmark choice.

The expert should identify which feature is relevant to the alleged injury, treatment decision or prognosis.

## Spinal Measurements

Spinal disputes may involve:

- vertebral body height loss;
- kyphotic angle;
- canal diameter;
- spondylolisthesis;
- scoliosis;
- disc height;
- foraminal dimensions; and
- neural compression.

Single linear measurements should not replace qualitative assessment of morphology and neural effect.

For example, canal compromise should be considered alongside:

- residual cerebrospinal fluid;
- nerve-root crowding;
- level;
- cause;
- distribution;
- clinical findings; and
- change over time.

## Tumour Measurements

Tumour size may be assessed using:

- longest diameter;
- short-axis nodal diameter;
- bidimensional measurements;
- volumetry;
- standard response criteria; or
- disease-specific systems.

The expert should avoid applying a response criterion outside its intended purpose.

A difference in tumour diameter may affect staging or response classification, but the report should state whether:

- the same target lesion was measured;
- the same plane and method were used;
- the change exceeds likely variability;
- the lesion margins are well defined; and
- the classification has clinical relevance to the claim.

## PACS and Workstation Differences

Different viewers may display slightly different measurements because of:

- interpolation;
- reconstruction;
- rounding;
- calibration handling;
- measurement display;
- image scaling;
- software version; and
- user technique.

A disagreement between PACS values should prompt investigation of the method rather than an assumption that one workstation is defective.

The expert should, where material:

- verify the DICOM scale;
- use source images;
- avoid measuring screenshots;
- record the workstation or software;
- preserve annotated evidence;
- repeat the measurement;
- and state whether the difference affects the opinion.

## Screenshots and Exported Images

Screenshots may not preserve:

- original resolution;
- DICOM calibration;
- pixel spacing;
- complete metadata;
- original orientation;
- windowing;
- or the full examination.

Measurements made on screenshots may therefore be unreliable.

If only a screenshot is available, the expert should state the limitation and avoid presenting an absolute dimension unless an appropriate scale is preserved and validated.

## Observer Variability

The expert should distinguish between:

- personal repeatability;
- published reproducibility of the measurement method; and
- variability in the particular examination.

It is not necessary to quote a published coefficient for every measurement.

Literature may assist where:

- the measurement is central to the dispute;
- a validated method exists;
- a treatment threshold is close;
- opposing experts disagree materially;
- or reliability is known to be limited.

Published variability should be applicable to:

- the same modality;
- comparable technique;
- similar patient group;
- the same anatomical landmark;
- and the same measurement method.

A reliability value from a controlled research study may overstate reproducibility in routine clinical images.

## Statistical Measures of Agreement

Studies may report:

- intraclass correlation coefficients;
- kappa statistics;
- coefficients of variation;
- standard error of measurement;
- smallest detectable change;
- Bland–Altman limits of agreement; and
- mean absolute difference.

These measures answer different questions.

A high correlation does not prove close agreement. Two observers may rank cases similarly while recording systematically different measurements.

Where measurement uncertainty is central, the expert should select an agreement measure appropriate to the issue rather than relying on correlation alone.

## Imaging-Derived and Clinical Measurements

The report should distinguish measurements derived from images from those derived clinically.

### Imaging-derived measurements

Examples include:

- radiographic limb length;
- fracture displacement;
- tumour diameter;
- spinal angle;
- cartilage-defect dimensions; and
- muscle cross-sectional area.

### Clinical measurements

Examples include:

- range of movement;
- limb circumference;
- apparent limb length;
- instability;
- muscle power;
- gait;
- tenderness; and
- functional performance.

An imaging expert should not present a radiological measurement as a complete measure of disability.

Clinical impact may require evidence from orthopaedics, rehabilitation medicine, occupational therapy, physiotherapy or another appropriate discipline.

## Measurement and Quantum

Radiological measurement may inform valuation indirectly by contributing to opinions about:

- severity of injury;
- permanence;
- need for surgery;
- future degeneration;
- functional restriction;
- prosthetic or implant requirements;
- treatment cost;
- work capacity; and
- care needs.

The radiologist does not determine the monetary value of the claim.

The expert should identify the imaging evidence and its uncertainty, leaving valuation and non-radiological consequences to the court and appropriately qualified experts.

It is unsafe to state that a difference of several millimetres routinely creates a particular financial difference without evidence specific to the case.

## The Legal Framework

The court requires expert evidence that is independent, objective and within the expert's competence.

A measurement-based opinion should comply with the same principles as any other expert evidence:

- identify the evidence;
- explain the method;
- state assumptions;
- consider contrary evidence;
- acknowledge uncertainty;
- address the reasonable range of opinion;
- and distinguish breach, causation and quantum.

The existence of a numerical result does not convert opinion into indisputable fact.

## A Structured Expert Method

### Step 1: Define the issue

Identify:

- what is being measured;
- why it matters;
- which legal or clinical question it informs;
- and whether a threshold is alleged.

### Step 2: Obtain the best available examination

Review:

- original DICOM data;
- complete series;
- relevant prior and later examinations;
- acquisition information;
- and any calibration marker.

### Step 3: Select the method

Record:

- modality;
- projection or sequence;
- plane;
- anatomical landmarks;
- calibration;
- measurement tool;
- and whether the method follows a recognised standard.

### Step 4: Check adequacy

Consider:

- positioning;
- coverage;
- artefact;
- resolution;
- magnification;
- distortion;
- and whether the examination can answer the question reliably.

### Step 5: Repeat the measurement

Where material, repeat the measurement without reference to the first result.

If the values differ, consider whether:

- a mean is appropriate;
- one method is preferable;
- the difference reflects uncertain landmarks;
- or the measurement should be reported as a range.

### Step 6: Compare the opposing method

If another expert records a different result, identify whether the disagreement arises from:

- different images;
- different planes;
- different landmarks;
- different calibration;
- different boundaries;
- different software;
- or a transcription error.

### Step 7: State uncertainty

Explain:

- likely measurement variability;
- whether the difference exceeds expected error;
- whether the threshold is genuinely crossed;
- and whether the uncertainty affects the conclusion.

### Step 8: Explain clinical relevance

State what the measurement supports and what it does not establish.

Avoid converting an imaging number directly into a conclusion about function, prognosis or financial loss without the necessary evidence.

## How to Report a Material Measurement

A useful formulation might be:

> On the weight-bearing long-leg radiograph dated 12 March 2025, I measured the mechanical axis using the centres of the femoral head, knee and ankle. The axis passes 14 mm medial to the centre of the knee. Repeated measurement produced values of 13–15 mm. The examination is mildly rotated, which limits precision. In my opinion, the study demonstrates varus alignment, but the exact magnitude should not be treated as accurate to a single millimetre.

For an uncalibrated projection radiograph:

> The radiograph contains no reliable calibration marker at the anatomical plane of interest. The PACS measurement describes the apparent dimension on the image and may be affected by magnification. I therefore do not regard the recorded absolute length as sufficiently accurate for implant sizing or a millimetric limb-length comparison.

For a cross-sectional lesion:

> On the axial contrast-enhanced CT image, the lesion measures approximately 18 × 14 mm. On the coronal reconstruction it measures 20 mm craniocaudally. The margins are mildly indistinct, and a difference of 1–2 mm on repeat measurement would not represent reliable interval change.

## Disagreement Between Experts

A measurement dispute should be localised before it is characterised as a difference of opinion.

The experts should establish:

- whether they used the same examination;
- whether the same image or reconstruction was selected;
- whether the same landmarks were used;
- whether calibration was applied consistently;
- whether measurements were repeated;
- whether the difference exceeds expected variability;
- and whether it changes the clinical conclusion.

The joint statement should record both the numerical difference and the reason for it where possible.

Agreement on method may resolve the dispute even where the initial numbers differed.

## Material Capable of Changing the Opinion

The report should identify evidence that could alter the measurement-based conclusion.

Examples include:

- a properly calibrated radiograph;
- a weight-bearing examination;
- a complete long-leg view;
- thinner CT reconstructions;
- the original DICOM dataset;
- an earlier comparison study;
- a validated clinical measurement;
- operative measurements;
- or clarification of the anatomical landmark used by another expert.

This is particularly important where the opinion remains provisional because only screenshots or incomplete images were supplied.

## Practical Point for Radiologists

When a measurement may influence treatment or litigation:

- use an appropriate examination;
- verify calibration where absolute size matters;
- select reproducible landmarks;
- record the plane and method;
- avoid false decimal precision;
- compare like with like;
- repeat measurements where material;
- acknowledge technical limitations;
- and state whether the uncertainty changes the conclusion.

## Practical Point for Expert Witnesses

The expert should not increase apparent authority by presenting every value to the smallest unit displayed by the software.

The report should make clear:

- which measurements were personally obtained;
- which were copied from records;
- which are imaging-derived;
- which are clinical;
- which are estimates;
- and which are sufficiently reliable to support the opinion.

Where another specialty must interpret the functional or prognostic significance, that boundary should be stated.

## Practical Point for Legal Professionals

A numerical disagreement should prompt questions about method before credibility.

The instruction should ask:

1. What was measured?
2. On which examination and image?
3. Was the image calibrated?
4. Were positioning and projection appropriate?
5. Which landmarks were used?
6. Was the measurement repeated?
7. What variability is expected?
8. Does the disagreement cross a meaningful threshold?
9. Would a different value actually alter treatment, prognosis or valuation?
10. Which conclusions require evidence outside radiology?

The presence of different numbers does not necessarily mean that one expert is wrong. It may show that the measurement is less reproducible than the pleaded case assumes.

## Conclusion

Radiological measurements can be valuable evidence, but they should not be mistaken for exact anatomical truth.

The reliability of a measurement depends on:

- modality;
- calibration;
- positioning;
- acquisition;
- plane;
- landmarks;
- boundary definition;
- observer technique;
- biological variability; and
- clinical relevance.

The proper expert approach is not to select the most favourable number. It is to define the method, quantify or describe the uncertainty, determine whether the difference is real and explain whether it affects the opinion.

A measurement is most useful to the court when its limitations are as transparent as its numerical result.

## References

- Civil Procedure Rules, Part 35: Experts and Assessors.
- Practice Direction 35: Experts and Assessors.
- Civil Justice Council. *Guidance for the Instruction of Experts in Civil Claims*. 2014.
- Elnaggar A, Allen D, Abdelnour D, et al. *Development and Validation of Radiographic Measurement Templates for Standardized X-ray Analysis*. Cureus. 2025;17:e83232.
- Bland JM, Altman DG. *Statistical Methods for Assessing Agreement Between Two Methods of Clinical Measurement*. The Lancet. 1986;1:307–310.
- Kottner J, Audigé L, Brorson S, et al. *Guidelines for Reporting Reliability and Agreement Studies*. Journal of Clinical Epidemiology. 2011;64:96–106.
- Relevant modality- and anatomy-specific measurement standards should be checked for the issue under consideration.

> Educational radiological and medicolegal commentary only. It is not medical advice, legal advice, a valuation of any claim or an expert opinion on an identifiable individual.