<?php
/**
 * @file field--fences-b.tpl.php
 * Wrap each field value in the <b> element.
 *
 * @see http://developers.whatwg.org/text-level-semantics.html#the-b-element
 */
?>
<h3 class="field-label<?php if ($element['#label_display'] == 'inline') { print " inline-sibling"; } ?>"<?php print $title_attributes; ?>>
  <?php print $label; ?>
</h3>

<?php foreach ($items as $delta => $item): ?>
  <b class="<?php print $classes; ?>"<?php print $attributes; ?>>
    <?php print render($item); ?>
  </b>
<?php endforeach; ?>
